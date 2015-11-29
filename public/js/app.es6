'use strict';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { decksReducer } from 'reducers/cardReducer';
import * as cardActions from 'actions/cardActions';
import { allCards } from 'data/cards';

// for testing
import { CardComponent } from 'components/cards/cardComponents';
import { PlayerFieldsComponent } from 'components/playerField/playerFieldComponents';

const store = createStore(decksReducer);
store.dispatch(cardActions.addDecksAction(allCards));

console.log('decks', store.getState());

const GwentAppd = () => (
    <div className="gameBoard js_gameBoard">
        <PlayerFieldsComponent cards={store.getState()} />
    </div>
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
        <GwentAppd />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
