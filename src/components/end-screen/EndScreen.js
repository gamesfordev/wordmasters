import React, {Component} from 'react';
import  { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class EndScreen extends Component {

  constructor() {
    super();
    this.state = {
      again: false
    };
  }

  playAgain() {
    this.setState({
      again: true
    });
  }

  render() {
    if(this.state.again) {
      return (
        <Redirect to="/game"></Redirect>
      );
    }
    return (
      <div className="StartScreen">
        End Screen

        <Button onClick={this.playAgain.bind(this)}>Play again</Button>
      </div>
    );
  }
}

export default EndScreen;