import { describe, it, expect, jest } from '@jest/globals';

jest.mock("../db/index.js", () => ({
    pool: {
        query: jest.fn(),
        end: jest.fn()
    }
}));

import request from "supertest";
import { app } from "../app.js";
import { pool } from "../db/index.js";

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