'use strict';

var request = require('supertest');
var app = require('../../server/server');

describe('GET /proposals returns proposals', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/api/proposals')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
