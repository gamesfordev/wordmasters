import React from 'react';
import { Redirect } from 'react-router';
import FirebaseService from '../../gamedata/firebase/firebase.service';

class StartScreen extends React.Component {
  firebase;
  constructor(props) {
    super(props);
    this.firebase = FirebaseService();

    this.state = { players: [] };
  }

  componentDidMount() {
    this.getUserData();
    // this.removeData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  removeData = () => {
    this.firebase
      .database()
      .ref('/')
      .set({});
  };

  writeUserData = () => {
    this.firebase
      .database()
      .ref('/')
      .set(this.state);
    console.log('write');
  };

  getUserData = () => {
    this.firebase
      .database()
      .ref('/')
      .once('value')
      .then(snapshot => {
        console.log('getUserData', snapshot.val());
        if (snapshot.val()) this.setState(snapshot.val());
        console.log(this.state);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    let username = this.refs.username.value;
    let uid = this.refs.uid.value;

    if (username) {
      console.log(this.state);
      let players = this.state.players;
      players.push({ player: { score: 0, username } });
      console.log(players);

      this.setState({
        players
      });
      this.redirect = true;
      localStorage.setItem('username', username);

      //   this.setState(...this.state, players);
      //   this.setState({ player: { score: 0, username } });
    }

    this.refs.username.value = '';
    this.refs.uid.value = '';
  };

  render() {
    if (this.redirect) {
      return <Redirect to={'/game/'} />;
    }
    return (
      <div className='StartScreen'>
        Start Screen
        <form onSubmit={this.handleSubmit}>
          <input type='hidden' ref='uid' />
          <div className='form-group"'>
            <div className='form-group col-md-6'>
              <label>Username</label>
              <input
                type='text'
                ref='username'
                className='form-control'
                placeholder='Username'
              />
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            Start
          </button>
        </form>
      </div>
    );
  }
}

export default StartScreen;
