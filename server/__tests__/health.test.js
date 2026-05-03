// Health test route 
    // Check that the server is correctly running with the health route
const request = require('supertest');
const app = require('../app');
const { describe, test } = require('jest-circus');

// describe keyword used to group tests that are related
describe('GET route /api/health', () => {
    it('return status 200', async () => {
        const response = await request(app).get('/api/health');

        expect(response.status).toBe(200); // 200 -> OK HTTP status code
    });

    it('return server message correctly', async () => {
        const response = await request(app).get('/api/health');

        expect(response.body.status).toBe('Server is running correctly');
    })
});
