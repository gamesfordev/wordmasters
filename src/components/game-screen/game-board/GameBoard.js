import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'
import './GameBoard.css'
import BoardItem from './board-item/BoardItem';
import Words from '../../../gamedata/words'
import GameSound from './game-sound/GameSound';


class GameBoard extends Component {

    mainLoop;
    items;
    currentWord = "";
    currentCorrectWord = "";
    score = 0;
    time = 120;
    running = true;

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.startGame();
        window.onkeydown = this.handleKeyPress.bind(this);
    }

    componentWillUnmount() {
        this.endGame();
    }

    getRandomNumber(limit) {
        return parseInt((Math.random() * 100000) % limit);
    }

    handleKeyPress(event) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            let letter = event.key.toUpperCase();
            let index = this.state.items.findIndex(e => (e.letter == letter && !e.pressed));
            if(index != -1) {
                this.items[index].pressed = true;
                this.setState({
                    items: this.items
                });
                this.currentWord += letter;
            }

            if(this.currentWord == this.currentCorrectWord) {
                this.score += this.currentCorrectWord.length;
                this.props.updateScore(this.score);
                setTimeout(() => {this.nextChallenge()}, 500);
                this.playEffect('correct-sound');
                return;
            }
        }
        else if(event.code == "Space") {
            if(this.score - 1 >= 0) {
                setTimeout(() => {this.nextChallenge()}, 500);
                this.score -= 1;
                this.props.updateScore(this.score);
                this.playEffect('missed-sound');
            }
            else {
                this.running = false;
            }
        }
    }

    startGame() {
        this.mainLoop = setInterval(() => {this.gameTick()}, 1000);
        this.nextChallenge();
    }

    endGame() {
        clearInterval(this.mainLoop);
        localStorage.setItem('game_data', JSON.stringify({
            score: this.score
        }));
    }

    nextChallenge() {
        const grids = [8,9,10];
        this.currentWord = "";
        this.currentCorrectWord = Words[this.getRandomNumber(Words.length)];
        this.items = this.createBoard(grids[this.getRandomNumber(grids.length)], this.currentCorrectWord);
        this.setState({
            items : this.items
        });
    }

    gameTick() {
        this.time --;
        this.props.updateTime(this.time);
        if(this.time == 0) {
            this.running = false;
        }
    }

    createBoard(N, word) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let letters = alphabet.split('').filter((e) => (word.indexOf(e) == -1));
        let B = [];
        let linearB = [];
        const width = 100 / N;
        // Fill random letters
        for (let i = 0; i < N; i++) {
            let b = [];
            for (let i = 0; i < N; i++) {
                b.push({
                    letter: letters[this.getRandomNumber(letters.length)],
                    correct: false,
                    width: width
                });
            }
            B.push(b);
        }

        //Inject correct letters
        let randomX = this.getRandomNumber(N - word.length);
        let randomY = this.getRandomNumber(N);
        for (let i = 0; i < word.length; i++) {
            B[randomY][randomX + i] = {
                letter: word[i],
                correct: true,
                width: width
            };
        }

        for (let i = 0; i < N; i++) {
            linearB = linearB.concat(B[i]);
        }

        return linearB;

    }

    playEffect(effect) {
        if (this.child) this.child.playEffect(effect);
    }

    render() {
        if(!this.running) {
            return <Redirect to="/end"></Redirect>;
        }
        return <div className='game-box'> 
                <GameSound
                ref={instance => {
                    this.child = instance;
                }}
                />
                {
                    this.state.items.map((elem) => {
                        return <BoardItem width={elem.width} letter={elem.letter} key={Math.random()} pressed={elem.pressed}/>
                    })
                }
        </div>;
    }
}

export default GameBoard;
