const { describe, it, after, before } = require('mocha');
const supertest = require('supertest');
const assert = require('assert');

describe('API test suite', () => {
  let app;

  before((done) => {
    app = require('./api');
    app.once('listening', done);
  });

  after((done) => app.close(done));

  describe('/contact:get', () => {
    it('Should request the contact route and return HTTP status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200);

      assert.strictEqual(response.text, 'Contact us page\n');
    });
  });

  describe('/login:post', () => {
    it('Should request the login route and return HTTP status 200', async () => {
      const response = await supertest(app).post('/login').send({ username: 'Esteban', password: '123' }).expect(200);

      assert.strictEqual(response.text, 'Successfully logged in\n');
    });

    it('Should request the login route and return HTTP status 401', async () => {
      const response = await supertest(app).post('/login').send({ username: 'Test', password: '123' }).expect(401);

      assert.ok(response.unauthorized);
      assert.strictEqual(response.text, 'Login failed!\n');
    });
  });

  describe('/hi:get - 404', () => {
    it('Should request a route and return HTTP status 404', async () => {
      const response = await supertest(app).get('/hi').expect(404);

      assert.strictEqual(response.text, 'Not found\n');
    });
  });
});
