import React from 'react';
import Firebase from 'firebase';
import config from '../../config';

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(config);

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
    Firebase.database()
      .ref('/')
      .set({});
  };

  writeUserData = () => {
    Firebase.database()
      .ref('/')
      .set(this.state);
    console.log('write');
  };

  getUserData = () => {
    Firebase.database()
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

      //   this.setState(...this.state, players);
      //   this.setState({ player: { score: 0, username } });
    }

    this.refs.username.value = '';
    this.refs.uid.value = '';
  };

  render() {
    const { developers } = this.state;
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
