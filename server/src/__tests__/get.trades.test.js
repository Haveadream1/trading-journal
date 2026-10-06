import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock("../db/index.js", () => ({
    pool: {
        query: jest.fn(),
        end: jest.fn()
    }
}));

import request from "supertest";
import { app } from "../app.js";
import { pool } from "../db/index.js";
import { afterAll } from 'jest-circus';

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

    afterAll(async () => {
        await pool.end();
    });
})