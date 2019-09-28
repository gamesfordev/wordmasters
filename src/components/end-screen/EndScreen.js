import React, { Component } from 'react';
import Firebase from 'firebase';
import config from '../../config';

class EndScreen extends Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      players: [],
      username: localStorage.getItem('username'),
      rowsPerPage: 10,
      page: 0
    };
  }

  componentDidMount() {}

  share() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
      'pop',
      'width=600, height=400, scrollbars=no'
    );
  }

  render() {
    return (
      <div className='EndScreen'>
        <table class='table table-striped table-dark'>
          <thead>
            <tr>
              <th scope='col'>Player</th>
              <th scope='col'>Score</th>
              <th scope='col'>Last</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EndScreen;
