// Test file to verify the delete route

jest.mock('../database', () => ({
    query: jest.fn()
}))

const request = require('supertest');
const app = require('../app');
const pool = require('../database');
const { describe, beforeEach } = require('jest-circus');

describe('DELETE route /api/trades/:id', () => {
    beforeEach(() => {
        pool.query.mockReset()
    })

    it('return an error status for an NAN id', async () => {
        const response = await request(app).delete('/api/trades/qqq');
            
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid id for deleting trade');    
    })

    it('return an error status for a trade not found', async () => {
        pool.query.mockResolvedValueOnce({ rows:[] });

        const response = await request(app).delete('/api/trades/9');
        
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Trade not found in database');
    })

    it('return a success status for a trade deleted', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{ id: 1, trade_date: '2025/01/01', asset: 'EUR/USD', direction: 'win', outcome: 'win', net_pnl: 40 }]
        })
        
        const response = await request(app).delete('/api/trades/1');
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Trade deleted successfully by id');    
    })

    it('return an error status for a failed attempt to delete the trade', async () => {
        pool.query.mockRejectedValueOnce(new Error('Connection failed'));

        const response = await request(app).delete('/api/trades/1');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error deleting trade with id');
    })
})