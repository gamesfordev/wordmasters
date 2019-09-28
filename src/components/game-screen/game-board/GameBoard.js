import React, { Component } from 'react'
import './GameBoard.css'


class GameBoard extends Component {

    mainLoop;
    items;

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.startGame();
    }

    getRandomNumber(limit) {
        return parseInt((Math.random() * 100000) % limit);
    }

    startGame() {
        this.mainLoop = setInterval(this.gameTick, 1000);
        this.items = this.createBoard(10, 'LEGEND');
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
                        let style = {width: elem.width + '%'};
                        return <div className="box-item" style={style}>{elem.letter}</div>;
                    })
                }
        </div>;
    }
}

export default GameBoard;
