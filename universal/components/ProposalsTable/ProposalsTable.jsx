import React from 'react';

const ProposalsTable = React.createClass({
  render() {
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
      <th>#</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Username</th>
  </tr>
  </thead>
    <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Tompson</td>
      <td>the_mark7</td>
      <td>
        <a href="user.html"><i className="icon-pencil"></i></a>
        <a href="#myModal" role="button" data-toggle="modal"><i className="icon-remove"></i></a>
        </td>
        </tr>

        </tbody>
      </table>
    </div>
    </div>)
  }
});

module.exports = ProposalsTable;
