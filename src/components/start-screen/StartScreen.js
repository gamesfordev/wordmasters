import React from 'react';
import { Redirect } from 'react-router';
import FirebaseService from '../../gamedata/firebase/firebase.service';
import './StartScreen.css';
import Logo from '../../gamedata/images/logo-game.png';

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

  removeData = () => {
    this.firebase
      .database()
      .ref('/')
      .set({});
  };

  writeUserData = () => {
    console.log('state', this.state);
    
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
      console.log('subit state',JSON.parse(JSON.stringify(this.state)));
      let userExist = false;
      if(this.state.players){
        this.state.players.some(element =>{
          console.log(element.player.username, username);
          if(element.player.username === username){
            userExist = true;
          }
      });
      }
    console.log(userExist);
    
    if(!userExist){
      let players = this.state.players;
      players.push({ player: { score: 0, username } });
      this.setState({
        players
      });
      
      this.writeUserData();
      //   this.setState(...this.state, players);
      //   this.setState({ player: { score: 0, username } });
    }
    localStorage.setItem('username', username);
     this.props.history.push(`/game`);

     this.refs.username.value = '';
    }
   
   
  };

  render() {
    return (
      <div className='StartScreen center_div' >
        <div className="master">
			<div className="login_box">
			<img src={Logo} className="logo"/>
					<div className="name">
						<form onSubmit={this.handleSubmit} className="loginForm">
							<div className='form-group"'>
								<div className='form-group'>
								<label className="col-md-10 text-center"></label>
								<input
									type='text'
									ref='username'
									className='form-control'
                  placeholder='Username'
                  autoFocus={true}
								/>
								</div>
							</div>
							<div className="col-md-12 text-center"> 
								<button type='submit' className='btn btn-danger'>
									Play Game!
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
