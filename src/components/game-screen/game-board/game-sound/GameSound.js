import React, { Component } from 'react';
import soundFile from '../../../../gamedata/sounds/bgsound.mp3';
import correctSoundFile from '../../../../gamedata/sounds/correct-sound.mp3';
import missedSoundFile from '../../../../gamedata/sounds/missed-sound.mp3';
import typeSoundFile from '../../../../gamedata/sounds/type-sound.mp3';

class GameSound extends Component {
  constructor() {
    super();
    this.bgSound = new Audio(soundFile);
    this.correctSound = new Audio(correctSoundFile);
    this.missedSound = new Audio(missedSoundFile);
    this.typeSound = new Audio(typeSoundFile);
  }

  playEffect(effect) {
    switch (effect) {
      case 'correct-sound':
        this.correctSound.play();
        break;
      case 'type-sound':
        this.typeSound.play();
        break;
      case 'missed-sound':
        this.missedSound.play();
        break;
    }
  }

  componentDidMount() {
    this.bgSound.play();
  }

  componentWillUnmount() {
    this.bgSound.pause();
    this.bgSound.currentTime = 0;
  }

  render() {
    return null;
  }
}

export default GameSound;