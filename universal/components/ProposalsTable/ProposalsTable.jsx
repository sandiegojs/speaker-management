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
        console.log("Proposals listed below:");
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    // TODO: save response from http request to proposals variable
    // and update the state so that data shows on page
    var proposals = [
      {id: 1, speakerId: 1, talkId: 1},
      {id: 2, speakerId: 2, talkId: 2},
      {id: 3, speakerId: 3, talkId: 3},
      ]

    var proposalRows = proposals.map(function(proposal) {
      return React.createElement(ProposalRow, { proposal: proposal });
    });

    return (
      <div>
        <div>
          <button>Sign up for a lightning talk</button>
        </div>
        <br />
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
