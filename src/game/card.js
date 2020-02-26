import React from 'react';
import { connect } from 'react-redux';
import { faceUp } from './actions.js';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flipped : false
        };
    }

    flipCard = () => {
        this.props.dispatch(faceUp(this.props.index));
        
        // this.setState({
        //     flipped : true
        // });
    }

    render() {
        return (
            <button onClick={this.flipCard}>{(this.props.deck[this.props.index] === 1) ? this.props.symbol : "?"}</button>
        );
    }
}

function mapStateToProps(state) {
    return {
        deck : state.deck
    };
}

export default connect(mapStateToProps)(Card);