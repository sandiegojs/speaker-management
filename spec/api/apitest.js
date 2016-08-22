'use strict';

const request = require('supertest');
const app = require('../../server/server');

describe('GET /api/proposals', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/api/proposals')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});


describe("POST /api/proposals", function (){
  it("Posts a new proposal to /api/proposals", function(done){
    let proposal = {
      speakerId: '123a',
      talkId: '234a',
      proposedDate: '8/20/16',
      status: 'new'
    }

    request(app)
      .post("/api/proposals")
      .send(proposal)
      .expect(200, done);
  });
});
