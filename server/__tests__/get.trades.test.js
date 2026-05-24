// Test to verify if we correctly get the trades from the database
    // and how it handles errors

// mocking is replacing the database with a simulated one
jest.mock('../database', () => ({
    query: jest.fn() // create the fake(mock) function
}))

const request = require('supertest');
const { describe, beforeEach } = require("jest-circus");
const app = require("../app");
const pool = require('../database');

describe('GET route /api/trades', () => {
    // Clean mocks
    beforeEach(() => {
        pool.query.mockReset();
    })

    it('return the object type passed to the response', async () => {    
        const response = await request(app).get('/api/trades');

        expect(response.body).toBeInstanceOf(Object);
    })

    it('return correctly the error message', async () => {
        // inform mock to throw an error 
        pool.query.mockRejectedValueOnce(new Error('Failed to fetch trades'))
        
        const response = await request(app).get('/api/trades');

        expect(response.status).toBe(500) // 500 -> server error status code
        expect(response.body.error).toBe('Error reading all trades from database');
    })
})