import React from 'react';
import ReactDOM from 'react-dom';
import Board from './game/board.js'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
    deck : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'FACE_UP':
            return {
                deck : state.deck.map((item, index) => {
                    if (index === action.value) {
                        return 1;
                    }
                    return item;
                })
            };
        case 'FACE_DOWN':
            return {
                deck : state.deck.map((item, index) => {
                    if (index === action.value) {
                        return 0;
                    }
                    return item;
                })
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <Board></Board>
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));