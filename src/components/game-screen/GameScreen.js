import React, {Component} from 'react';
import GameBoard from './game-board/GameBoard';
import './GameScreen.css';
import LeftPanel from './left-panel/LeftPanel';
import RightPanel from './right-panel/RightPanel';
import Logo from '../../gamedata/images/logo-game.png';

class GameScreen extends Component {

  time = 0;
  score = 0;

  constructor() {
    super();
    this.state = {
      time: 0,
      score: 0,
      intro: ''
    };
  }

  introLine1() {
    this.setState({
      intro: 'Each board has a hidden tech word'
    });
    setTimeout(() => {this.introLine2()}, 1200);
  }

  introLine2() {
    this.setState({
      intro: <span>Type it or press <b>space</b> to skip</span>
    });
    setTimeout(() => {this.introLine3()}, 1200);
  }

  introLine3() {
    this.setState({
      intro: 'Get Ready!!'
    });
    setTimeout(() => {this.setState({
      intro: ''
    })}, 1200);
  }

  updateTime(time) {
    this.time = time;
    this.setState({
      time: this.time
    });
  }

  updateScore(score) {
    this.score = score;
    this.setState({
      score: this.score
    });
  }

  componentDidMount() {
    setTimeout(() => {this.introLine1()}, 1000);
  }

  render() {
    return (
      <div className="GameScreen">
          <img src={Logo} className="logo-game"/>
          <LeftPanel time={this.state.time}></LeftPanel>
          <RightPanel score={this.state.score}></RightPanel>
          <GameBoard updateTime={this.updateTime.bind(this)} updateScore={this.updateScore.bind(this)}></GameBoard>
          <div className="status-panel">{this.state.intro}</div>
      </div>
    );
  }
}

export default GameScreen;