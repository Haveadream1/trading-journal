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

    })

    it('return an error status for a trade not found', async () => {

    })

    it('return a success status for a trade deleted', async () => {

    })

    it('return an error status for a failed attempt to delete the trade', async () => {
        
    })
})