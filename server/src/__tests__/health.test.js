import request from "supertest";
import { app } from "../app.js";
import { describe, it, expect } from '@jest/globals';

// describe keyword used to group tests that are related
describe('GET route /api/health', () => {
    it('return status 200', async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200); // 200 -> OK HTTP status code
    });

    it('return server message correctly', async () => {
        const response = await request(app).get('/health');

        expect(response.body.message).toBe('Server is running correctly');
    })
});
