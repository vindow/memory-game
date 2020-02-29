import Card from './card.js';
import React from 'react';
import { connect } from 'react-redux';
import { faceDown, matched, reset } from './actions.js';
import "./css/board.css";

class Board extends React.Component {
    constructor(props) {
        super(props);
        let cards = ["☀", "☀", "☂", "☂","☁", "☁", "☺", "☺", "♡", "♡", "♪", "♪"];
        for (let i = 0; i < cards.length; i++) {
            let swapIndex = i + Math.floor(Math.random() * (cards.length - i));
            let temp = cards[i];
            cards[i] = cards[swapIndex];
            cards[swapIndex] = temp;
        }
        this.state = {
            deck : cards,
            score: 0,
            guesses: 0
        }
    }

    createGrid = () => {
        let grid = [];
        for (let i = 0; i < this.state.deck.length; i++) {
            grid.push(<Card symbol={this.state.deck[i]} index={i} key={i}></Card>);
        }
        return grid;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.numFlipped === 2) {
            let first = -1;
            let second = -1;
            for (let i = 0; i < 12; i++) {
                if (this.props.deck[i] === 1) {
                    if (first === -1) {
                        first = i;
                    } else {
                        second = i;
                        break;
                    }
                }
            }
            if (this.state.deck[first].localeCompare(this.state.deck[second]) === 0) {
                setTimeout(() => {
                    this.props.dispatch(matched(first));
                    this.props.dispatch(matched(second));
                    this.setState({
                        guesses: this.state.guesses + 1,
                        score : this.state.score + 200
                    });
                }, 1000);
            } else {
                setTimeout(() => {
                    this.props.dispatch(faceDown(first));
                    this.props.dispatch(faceDown(second));
                    this.setState({
                        guesses: this.state.guesses + 1,
                        score : this.state.score - 50
                    });
                }, 1000);
            }
            
        }
    }

    reset = () => {
        let cards = ["☀", "☀", "☂", "☂","☁", "☁", "☺", "☺", "♡", "♡", "♪", "♪"];
        for (let i = 0; i < cards.length; i++) {
            let swapIndex = i + Math.floor(Math.random() * (cards.length - i));
            let temp = cards[i];
            cards[i] = cards[swapIndex];
            cards[swapIndex] = temp;
        }
        this.setState({
            deck : cards,
            score: 0,
            guesses: 0
        });
        this.props.dispatch(reset());
    }

    render() {
        return (
            <div className="centerContainer">
                <div className="scoreBoard">
                    <span className="scoreText">Score: {this.state.score}</span>
                    <span className="scoreText">Total Guesses: {this.state.guesses}</span>
                </div>
                <div className="board">
                    {this.createGrid()}
                </div>
                <button className="resetButton" onClick={this.reset}>Restart</button>
            </div>
            
        );
    }
}

function mapStateToProps(state) {
    return {
        deck : state.deck,
        numFlipped : state.numFlipped
    };
}

export default connect(mapStateToProps)(Board);