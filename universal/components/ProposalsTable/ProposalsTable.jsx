import React from 'react';


const ProposalsTable = React.createClass({
  render: function() {

    var proposals = [
      { id: 1, speakerId: 1, talkId: 1 }
    ];

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
