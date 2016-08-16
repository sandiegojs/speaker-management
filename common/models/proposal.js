'use strict'

module.exports = function(Proposal) {

  const utils = require('loopback/lib/utils')
  Proposal.submit = function(data, cb) {
    cb = cb || utils.createPromiseCallback()
    const app = Proposal.app
    let speaker

    // create the speaker
    app.models.Speaker.findOrCreate({
      where: {
        email: data.speakerEmail
      }
    }, {
      name: data.speakerName,
      email: data.speakerEmail,
      githubId: data.speakerGithubId
    })
      .then(function(rec) {
        speaker = rec[0]
        console.log(speaker)
        // create the talk

        return app.models.Talk.create({
          title: data.talkTitle,
          description: data.talkDescription,
          speakerId: '123a'
        })
      })
      .then(function(talk) {
        // create the proposal
        return Proposal.create({
          speakerId: '123a',
          talkId: talk.id,
          proposedDate: data.talkProposedDate,
          status: 'new'
        })
      })
      .then(function(proposal) {
        cb(null, proposal)
      })
      .catch(cb)
    return cb.promise
  }

  Proposal.remoteMethod(
    'submit',
    {
      description: 'Handle submission through website.',
      accepts: [
        {
          arg: 'data',
          type: 'object',
          required: true,
          description: 'Object with data needed to create speaker, talk and proposal',
          http: {source: 'body'}
        }
      ],
      returns: {
        arg: 'proposal', type: 'object', root: true,
        description:
          'Created proposl.'
      },
      http: {
        verb: 'post',
        path: '/submit'
      }
    }
  )
}
