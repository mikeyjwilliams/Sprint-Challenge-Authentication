/** @format */

const supertest = require('supertest');
const server = require('../api/server');

let user = 'sally';

describe('login route', () => {
  describe('login', () => {
    test('login pass /api/auth/register', async () => {
      const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: user, password: '123' });

      expect(res.statusCode).toBe(201);
      expect(res.type).toBe('application/json');
      expect(res.body.username).toBe(user);
    });

    test('login fail /api/auth/register', async () => {
      const res = await supertest(server)
        .post('/api/auth/register')
        .send({ username: 'mikey', password: '123' });

      expect(res.statusCode).toBe(409);
      expect(res.type).toBe('application/json');
      expect(res.body.message).toMatch(/username/i);
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
