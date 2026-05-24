// Test to verify the update route

jest.mock('../database', () => ({
    query: jest.fn()
}))

const request = require('supertest');
const app = require("../app");
const pool = require("../database");
const { describe, beforeEach } = require('jest-circus');

describe("PUT route /api/trades/:id", () => {
    // Clean mock
    beforeEach(() => {
        pool.query.mockReset();
    })

    it('return correctly the error status for a NAN id', async () => {
        const response = await request(app)
            .put('/api/trades/wer')
            .send({ trade_date: '2025/01/01', asset: 'EUR/USD', direction: 'win', outcome: 'win', net_pnl: 40 })
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid id for editing the trade');
    })

    it('return correctly the error status for a trade not found', async () => {
        pool.query.mockResolvedValueOnce({ rows: [] });
        
        const response = await request(app)
            .put('/api/trades/12')
            .send({ trade_date: '2026/01/01', asset: 'GOLD', direction: 'sell', outcome: 'win', net_pnl: 40 })
        
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Trade not found in database');
    })

    it('return a success status code for an updated trade', async () => {
        const mockUpdatedTrade = { id: 1, trade_date: '2026/01/23', asset: 'GC', direction: 'buy', outcome: 'win', net_pnl: 120 };
        
        pool.query.mockResolvedValueOnce({
            rows: [{ id: 1, trade_date: '2026/01/23', asset: 'GC', direction: 'buy', outcome: 'win', net_pnl: 120 }]
        })
        
        const response = await request(app)
            .put('/api/trades/1')
            .send({ trade_date: '2026/01/23', asset: 'GC', direction: 'buy', outcome: 'win', net_pnl: 120 })
        
        expect(response.status).toBe(200);
        // Verify that the trades values are matching the updated trade
        expect(response.body).toEqual(mockUpdatedTrade); 
    })

    it('return an error for failed attempt to update a trade', async () => {
        pool.query.mockRejectedValueOnce(new Error('Connection failed'));

        const response = await request(app)
            .put('/api/trades/1')
            .send({ trade_date: '2026/01/23', asset: 'GC', direction: 'buy', outcome: 'win', net_pnl: 120 })
    
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Error editing the trade");
    })
})