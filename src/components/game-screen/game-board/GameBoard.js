import React, { Component } from 'react'
import './GameBoard.css'
import BoardItem from './board-item/BoardItem';
import Words from '../../../gamedata/words'


class GameBoard extends Component {

    mainLoop;
    items;
    currentWord = "";
    currentCorrectWord = "";
    score;

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
            console.log(this.currentCorrectWord, this.currentWord);
            if(this.currentWord == this.currentCorrectWord) {
                setTimeout(() => {this.nextChallenge()}, 500);
                return;
            }
        }
    }

    startGame() {
        this.mainLoop = setInterval(this.gameTick, 1000);
        this.nextChallenge();
    }

    nextChallenge() {
        this.currentCorrectWord = Words[this.getRandomNumber(Words.length)];
        this.items = this.createBoard(10, this.currentCorrectWord);
        this.setState({
            items : this.items
        });
    }

    gameTick() {
        console.log('Tick');
    }

    createBoard(N, word) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let letters = alphabet.split('').filter((e) => (word.indexOf(e) == -1));
        let B = [];
        let linearB = [];
        const width = N / 100 * 100;
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

    render() {
        return <div className='game-box'> 
                {
                    this.state.items.map((elem) => {
                        return <BoardItem width={elem.width} letter={elem.letter} key={Math.random()} pressed={elem.pressed}/>
                    })
                }
        </div>;
    }
}

export default GameBoard;
