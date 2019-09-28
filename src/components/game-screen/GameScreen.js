import React from 'react';
import GameBoard from './game-board/GameBoard';
import './GameScreen.css';

function GameScreen() {
  return (
    <div className="GameScreen">
        <GameBoard></GameBoard>
    </div>
  );
}

export default GameScreen;