// Unit testing for POST routes
    // Check that we get notified with an error for undefined input
    // Check that we get the correct response when succesfully inserted a trade

jest.mock('../database', () => ({
    query: jest.fn()
}))

const { describe, beforeEach } = require('jest-circus');
const request = require('supertest');
const app = require('../app');
const pool = require('../database');

describe('POST route for /api/trades', () => {
    // Clean mocks between tests
    beforeEach(() => {
        pool.query.mockReset();
    })

    it('return an error for undefined input', async () => {
        // Doesn't need to mock because validation occurs before the query
        const response = await request(app)
            .post('/api/trades')
            .send({ asset: 'NVDA' }) // only asset is defined, other are undefined so should throw an error

        expect(response.status).toBe(400) // 400 -> bad request HTML status code
        expect(response.body.error).toBe('Error with required inputs');
    })

    it('return a successful status code for inserted trade', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{ id: 1, trade_date: '2026/02/21', asset: 'EUR/USD', direction: 'buy', outcome: 'win', net_pnl: 201}]
        });
        
        const response = await request(app)
            .post('/api/trades')
            .send({ trade_date: '2026/02/21', asset: 'EUR/USD', direction: 'buy', outcome: 'win', net_pnl: 201});

        expect(response.status).toBe(201) // 201 -> created HTML status code
        expect(response.body.trade_date).toBe('2026/02/21'); // test that the response has the correct inserted value
    })
})
