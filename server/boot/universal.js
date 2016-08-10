'use strict';

require('babel-core/register')({
  presets: ['es2015', 'react']
});

const React = require('react');
const ProposalsTable = require('../../universal/components/ProposalsTable/ProposalsTable.jsx');
const ReactDOMServer = require('react-dom/server');
const proposalsTableFactory = React.createFactory(ProposalsTable);

module.exports = function(server) {
  let router = server.loopback.Router();
  router.get('/proposals', function(req, res) {
    let component = proposalsTableFactory();
    let markup = ReactDOMServer.renderToString(component);
    res.send(markup);
  });
  server.use(router);
};
