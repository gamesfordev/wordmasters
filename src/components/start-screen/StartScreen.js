import React from 'react';
import { Redirect } from 'react-router';
import FirebaseService from '../../gamedata/firebase/firebase.service';
import './StartScreen.css';

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
  };

  render() {
    if (this.redirect) {
      return <Redirect to={'/game/'} />;
    }
    return (
      <div className='StartScreen container center_div' >
        <div className="master">
			<div className="login_box">
				<div className="name">
					<form onSubmit={this.handleSubmit} className="loginForm">
						<div className='form-group"'>
							<div className='form-group col-md-6'>
							<label className="col-md-4 text-center">Enter Username</label>
							<input
								type='text'
								ref='username'
								className='form-control'
								placeholder='Username'
							/>
							</div>
						</div>
						<div className="col-md-4 text-center"> 
							<button type='submit' className='btn btn-primary'>
								Play
							</button>
						</div> 
					</form>
				</div>
			</div>
		</div>
      </div>
    );
  }
}

export default StartScreen;
