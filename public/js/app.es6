'use strict';
import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import decks from 'reducers/cardReducer';
import players from 'reducers/playerReducer';
import * as cardActions from 'actions/cardActions';
import { allCards } from 'data/cards';

// for testing
import { CardComponent } from 'components/cards/cardComponents';
import { PlayerFieldsComponent } from 'components/playerField/playerFieldComponents';

let combinedReducers = combineReducers({
	decks,
	players
});

const store = createStore(combinedReducers);
store.dispatch(cardActions.addDecksAction(allCards));

// test setup
store.dispatch({type: 'ADD_PLAYER', playerPosition: '1'});
store.dispatch({type: 'ADD_PLAYER', playerPosition: '2'});
//console.log('state', store.getState());
let testDecks = store.getState().decks;
store.dispatch({type: 'SELECT_DECK', deck: testDecks.nilfgaardian, playerPosition: '2'});
store.dispatch({type: 'SELECT_DECK', deck: testDecks.northernRealms, playerPosition: '1'});
store.dispatch({type: 'DRAW_HAND', playerPosition: '1'});
store.dispatch({type: 'DRAW_HAND', playerPosition: '2'});

//console.log('store', store.getState().players);

const TestComponent = () => (
	<div className="gameBoard js_gameBoard">
		<PlayerFieldsComponent players={store.getState().players} />
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
		<Provider store={store} >
			<TestComponent />
		</Provider>,
		document.getElementById('root')
	);
};

store.subscribe(render);
render();
