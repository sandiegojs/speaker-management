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
      talkTitle: "Do this instead of that",
      talkDescription: "That is so-so but this, this is revolutionary.",
    }
    request(app)
      .post("/api/proposals/submit")
      .send(proposal)
      .expect(200, done);
  });
});
