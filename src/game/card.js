import React from 'react';
import { connect } from 'react-redux';
import { faceUp } from './actions.js';
import "./css/card.css";

class Card extends React.Component {

    flipCard = () => {
        this.props.dispatch(faceUp(this.props.index));
    }

    render() {
        let color;
        if (this.props.deck[this.props.index] === 2) {
            color = {
                backgroundColor: '#2A602A'
            };
        } else {
            color = {
                backgroundColor: '#444489'
            };
        }
        return (
            <button className="card" onClick={this.flipCard} disabled={this.props.deck[this.props.index] !== 0 || this.props.numFlipped >= 2} style={color}>
                {(this.props.deck[this.props.index] !== 0) ? this.props.symbol : "?"}
                </button>
        );
    }
}

function mapStateToProps(state) {
    return {
        deck : state.deck,
        numFlipped : state.numFlipped
    };
}

export default connect(mapStateToProps)(Card);