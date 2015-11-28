'use strict';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { cardsReducer } from 'reducers/cardReducer';
import * as cardActions from 'actions/cardActions';
import { CardComponent } from 'components/cards/cardComponents';
import { CardRowComponent } from 'components/playerField/playerFieldComponents';
import { allCards } from 'data/cards';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return state + 1;
        case 'REMOVE_CARD':
            return state - 1;
        default:
            return state;
    }
};

const store = createStore(cardsReducer);
store.dispatch(cardActions.addCardAction(allCards.nilfgaardian.troops[0]));
store.dispatch(cardActions.addCardAction(allCards.nilfgaardian.troops[1]));

const GwentAppd = ({card}) => (
    <ul className="cardRow">
        <CardComponent card={card} />
    </ul>
);
const GwentApp = () => (
    <div className="gameBoard js_gameBoard">
        <SidebarComponent side="left"/>
        <PlayerFieldsComponent />
        <SidebarComponent side="right"/>
    </div>
);

const render = () => {
    ReactDOM.render(
        <CardRowComponent rowName='hand' cards={store.getState()} />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
