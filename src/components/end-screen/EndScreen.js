import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './EndScreen.css';
import FirebaseService from '../../gamedata/firebase/firebase.service';

class EndScreen extends Component {
  firebase;
  constructor() {
    super();
    this.firebase = FirebaseService();
    this.state = {
      score: 0,
      players: [],
      username: localStorage.getItem('username'),
      rowsPerPage: 10,
      page: 0,
      again: false,
      loading:false
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
   this.setState({...this.state,loading:true})
    this.firebase
      .database()
      .ref('/')
      .once('value')
      .then(snapshot => {
        console.log('getUserData', snapshot.val());
        if (snapshot.val()) this.setState({ players: snapshot.val().players });
        console.log(this.state);
        this.setState({...this.state,loading:false})
        console.log(this.state.loading);
      });
  };

  playAgain() {
    this.setState({
      again: true
    });
  }

  share() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
      'pop',
      'width=600, height=400, scrollbars=no'
    );
  }

  render() {
    if (this.state.again) {
      return <Redirect to='/game'></Redirect>;
    }
    return (
      <div className='EndScreen'>
            { this.state.loading ? 
            <React.Fragment>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div> 
            </React.Fragment>: 
             <table className='table table-dark'>
                <thead>
                  <tr>
                    <th scope='col'>Player</th>
                    <th scope='col'>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.players.map(row => {
                    return (
                      <tr className={ row.player.username === this.state.username ? 'row-selected' : ''} 
                          key={row.player.username}>
                        <td>{row.player.username}</td>
                        <td>{row.player.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
       
        <Button onClick={this.playAgain.bind(this)}>Play again</Button>
      </div>
    );
  }
}

export default EndScreen;
