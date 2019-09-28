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
      loading:false,
      url:""
    };
  }

  componentDidMount() {
    this.getUserData();
    this.setState({...this.state,url: window.location.href});
  }

  getUserData = () => {
   this.setState({...this.state,loading:true})
    this.firebase
      .database()
      .ref('/players')
      .once('value')
      .then(snapshot => {
        let playerList = snapshot.val();
        if (playerList){
          playerList.sort((a, b) =>  b.player.score - a.player.score );
          this.setState({...this.state, players: playerList});
        } 
        this.setState({...this.state,loading:false})
      });
  };

  playAgain() {
    this.setState({
      again: true
    });
  }

  share() {
    console.log(this.state.url);
    
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${this.state.url}`,
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
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div> 
           : 
             <table className='table table-dark'>
                <thead>
                  <tr>
                    <th scope='col'>Rank</th>
                    <th scope='col'>Player</th>
                    <th scope='col'>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.players.map((row, index) => {
                    return (

                      <tr className={ row.player.username === this.state.username ? 'row-selected' : ''} 
                          key={row.player.username}>
                        <td>{index+1}</td>
                        <td>{row.player.username}</td>
                        <td>{row.player.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
         <Button variant="contained" color="primary" onClick={this.share.bind(this)} className="btn btn-info">
                Share
         </Button>

        <Button onClick={this.playAgain.bind(this)}>Play again</Button>
      </div>
    );
  }
}

export default EndScreen;
