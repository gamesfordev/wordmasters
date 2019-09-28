import React, {Component} from 'react';
import GameBoard from './game-board/GameBoard';
import './GameScreen.css';
import LeftPanel from './left-panel/LeftPanel';
import RightPanel from './right-panel/RightPanel';

class GameScreen extends Component {

  time = 0;
  score = 0;

  constructor() {
    super();
    this.state = {
      time: 0,
      score: 0
    };
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

  render() {
    return (
      <div className="GameScreen">
          <LeftPanel time={this.state.time}></LeftPanel>
          <RightPanel score={this.state.score}></RightPanel>
          <GameBoard updateTime={this.updateTime.bind(this)} updateScore={this.updateScore.bind(this)}></GameBoard>
      </div>
    );
  }
}

export default GameScreen;