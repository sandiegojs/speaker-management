import React from 'react';
import axios from 'axios';

const ProposalsTable = React.createClass({

  loadProposalsFromServer: function () {
    var th = this;
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
        th.setState({
          proposals: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getInitialState: function() {
    return {
      proposals: [
        // dummy data to test initial state
        {id: 1, speakerId: 1, talkId: 1},
        {id: 2, speakerId: 2, talkId: 2},
        {id: 3, speakerId: 3, talkId: 3}
        ]
    }
  },

  // this section of code is not being hit, nothing logs to console
  componentDidMount: function() {
    console.log("I'm in the mainframe!")
    this.loadProposalsFromServer();
  },

  render: function() {

    // this is what each instance of a row will look like
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

    // create row elements from state data
    var proposalRows = this.state.proposals.map(function(proposal) {
      console.log(proposal);
      return React.createElement(ProposalRow, { proposal: proposal });
    });

    return (
        <div id='proposalsTable'>
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

// not sure what this does, but doesn't appear to be breaking anything
module.exports = ProposalsTable;

// was getting a "'document' not defined" error so wrapped it in an if statement to check
// to see if a window object is present (meaning it's on the browser/client side)
if (typeof window !== 'undefined') {
  React.render(<ProposalsTable />, document.getElementById("#content"));
}
