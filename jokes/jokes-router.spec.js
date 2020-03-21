/** @format */

const supertest = require('supertest');
const server = require('../api/server');

describe('jokes route', () => {
  describe('jokes fail no auth', () => {
    test('GET /api/jokes', async () => {
      const res = await supertest(server).get('/api/jokes');
      expect(res.statusCode).toBe(401);
      expect(res.type).toBe('application/json');
    });
  });
});
