// Test to verify if we correctly get the trades from the database
    // and how it handles errors
    
const request = require('supertest');
const { describe } = require("jest-circus");
const app = require("../app");
const pool = require('../database');

// mocking is replacing the database with a simulated one
jest.mock('../database', () => ({
    query: jest.fn() // create the fake(mock) function
}))

describe('GET route /api/trades', () => {
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