import React from 'react';
import axios from 'axios';

const ProposalsTable = React.createClass({
  render: function() {

    axios({
      method: 'get',
      // TODO: un-hardcode the url
      url: "http://localhost:3000/api/proposals",
      dataType: 'json',
      cache: false,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    var proposals = []

    var proposalRows = proposals.map(function(proposal) {
      return React.createElement(ProposalRow, { proposal: proposal });
    });

    return (
      <div>
        <div>
          <button>New User</button>
          <button>Import</button>
          <button>Export</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Proposal Id</th>
                <th>Speaker Id</th>
                <th>Talk Id</th>
              </tr>
            </thead>
            <tbody>
              {proposalRows}
            </tbody>
          </table>
        </div>
      </div>)
  }
});

var ProposalRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.proposal.id}</td>
        <td>{this.props.proposal.speakerId}</td>
        <td>{this.props.proposal.talkId}</td>
      </tr>)
  }
});

module.exports = ProposalsTable;
