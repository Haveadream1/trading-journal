// Unit testing for POST routes
    // Check that we get notified with an error for undefined input
    // Check that we get the correct response when succesfully inserted a trade

const { describe } = require('jest-circus');
const request = require('supertest');
const app = require('../app');

describe('POST route for /api/trades', () => {
    it('return an error for undefined input', async () => {

        const response = await request(app)
            .post('/api/trades')
            .send({ asset: 'NVDA' }) // only asset is defined, other are undefined so should throw an error

        expect(response.status).toBe(400) // 400 -> bad request HTML status code
        expect(response.body.error).toBe('Error with required inputs');
    })
})
