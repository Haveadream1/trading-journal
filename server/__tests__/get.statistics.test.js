// Test if we don't get errors when database is empty

jest.mock('../database', () => ({
    query: jest.fn()
}))

const request = require('supertest');
const { describe } = require("jest-circus");
const app = require('../app');
const pool = require('../database');

describe('GET route /api/statistics', () => {
    it('return totalTrades equal to 0 when database is empty', async () => {
        // Simulate totalResult.rows[0].total
        pool.query.mockResolvedValueOnce({ 
            rows: [{ total: 0}]
        });

        const response = await request(app).get('/api/statistics');

        expect(response.body.totalTrades).toBe(0);
    })
})