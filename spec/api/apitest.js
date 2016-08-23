'use strict';

const request = require('supertest');
const app = require('../../server/server');

describe('GET /api/proposals', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/api/proposals')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, done)
      .expect(200, done);
  });
});

describe("POST /api/proposals/submit", () => {
  it("Posts a new proposal to /api/proposals", (done) => {
    let proposal = {
      speakerName: "Danny",
      speakerEmail: "danny@pham.com",
      talkTitle: "X for Fun and Profit",
      talkDescription: "Learning X is great and you can haz monies",
    }
    request(app)
      .post("/api/proposals/submit")
      .send(proposal)
      .expect(200, done);
  });
});
