import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './EndScreen.css';
import FirebaseService from '../../gamedata/firebase/firebase.service';

class EndScreen extends Component {
  firebase;
  loading = false;
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
    this.setState({...this.state,url: window.location.href});
    this.getUserData();
  }

  getUserData = () => {
    this.loading = true;
    
     this.firebase
       .database()
       .ref('/players')
       .once('value')
       .then(snapshot => {
         let playerList = snapshot.val();
         
         if (playerList){
           playerList.sort((a, b) =>  b.player.score - a.player.score );
           this.loading = false;
           this.setState({...this.state, players: playerList});
         }
       });
   };

  playAgain() {
    this.setState({
      again: true
    });
  }

  share() {
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
      <div className='EndScreen center_div'>
        <div className="page-header text-center">
          <h1>Leaderboard </h1>  
          <br/>    
        </div>
            { this.loading ? 
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
           : <div className="t-wrapper">
             <table className='table table-dark text-centered mx-auto leaderboard-table'>
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
                        <td>#{index+1}</td>
                        <td>{row.player.username}</td>
                        <td>{row.player.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            }
            <br/>
      <div className="col text-center">
        <br/>
        <Button onClick={this.playAgain.bind(this)} className="btn-space btn-danger btn-lg">Play again</Button>
         <Button variant="contained" color="primary" onClick={this.share.bind(this)} className="btn-lg btn-danger btn-space ">
                Share
         </Button>
      </div>

       
      </div>
    );
  }
}

export default EndScreen;
