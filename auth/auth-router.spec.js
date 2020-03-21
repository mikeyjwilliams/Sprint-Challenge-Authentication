/** @format */

const supertest = require('supertest');
const server = require('../api/server');

describe('login route', () => {
  describe('login', () => {
    test('login pass /api/auth/register', async () => {
      const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'mikey', password: '123' });

      expect(res.statusCode).toBe(201);
      expect(res.type).toBe('application/json');
      expect(res.body.username).toBe('mikey');
    });
  });
});

describe('register route', () => {
  describe('register pass', () => {
    test('register /api/auth/login', async () => {
      const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'mikey', password: '123' });
      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
    });
  });
});
