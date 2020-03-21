/** @format */

const supertest = require('supertest');
const server = require('../api/server');

describe('login route', () => {
  describe('login fails', () => {
    it('login /api/auth/register', async () => {
      const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'mikey', password: '123' });

      expect(res.statusCode).toBe(409);
      expect(res.type).toBe('application/json');
    });
  });
});
