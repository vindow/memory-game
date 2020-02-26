import Card from './card.js';
import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        let cards = ["star", "star", "circle", "circle","square", "square", "heart", "heart", "arrow", "arrow", "plus", "plus"];
        for (let i = 0; i < cards.length; i++) {
            let swapIndex = i + Math.floor(Math.random() * (cards.length - i));
            let temp = cards[i];
            cards[i] = cards[swapIndex];
            cards[swapIndex] = temp;
        }
        this.state = {
            deck : cards,
            flippedIndex : -1
        }
    }

    createGrid = () => {
        let grid = [];
        for (let i = 0; i < this.state.deck.length; i++) {
            grid.push(<Card symbol={this.state.deck[i]} index={i} key={i}></Card>);
        }
        return grid;
    }

    render() {
        return (
            <div>
                {this.createGrid()}
            </div>
        );
    }
}

export default Board;