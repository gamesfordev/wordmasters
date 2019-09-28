import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import StartScreen from './components/start-screen/StartScreen';
import GameScreen from './components/game-screen/GameScreen';
import EndScreen from './components/end-screen/EndScreen';

function App() {
  return (
    <Router>
      <Route exact path="/" component={StartScreen} />
      <Route path="/game" component={GameScreen} />
      <Route path="/end" component={EndScreen} />
    </Router>
  );
}

export default App;
