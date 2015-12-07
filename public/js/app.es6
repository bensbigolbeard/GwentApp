'use strict';
import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Card Data
import { allCards } from 'data/cards';

// Reducers
import sourceDecks from 'reducers/decksReducer';
import players from 'reducers/playersReducer';
import playerDecks from 'reducers/playerDecksReducer';

// Actions
import * as deckActions from 'actions/deckActions';
import * as playerActions from 'actions/playerActions';

// for testing
import { CardComponent } from 'components/cards/cardComponents';
import { PlayerFieldsComponent } from 'components/playerField/playerFieldComponents';

let combinedReducers = combineReducers({
	sourceDecks,
	players,
	playerDecks,
});

const store = createStore(combinedReducers);
store.dispatch(deckActions.addDecks(allCards));
console.log('state', store.getState());

// test setup
store.dispatch(playerActions.addPlayer());
store.dispatch(playerActions.addPlayer());
{
	let currentStore = store.getState();
	currentStore.players.forEach((player) => {
		store.dispatch({type: 'SELECT_DECK', sourceDeckId: player.id, playerId: player.id, sourceDeck: currentStore.sourceDecks[player.id]});
	});
}
console.log('state', store.getState());
{
	let currentStore = store.getState();
	currentStore.players.forEach((player) => {
		store.dispatch({type: 'DRAW_HAND', playerDeckId: player.deckId});
	});
}

const TestComponent = () => {
	let currentState = store.getState();

	return (
		<div className="gameBoard js_gameBoard">
			<PlayerFieldsComponent
				sourceDecks={currentState.sourceDecks}
				players={currentState.players}
				playerDecks={currentState.playerDecks}
			/>
		</div>
	);
};
console.log('store', store.getState());

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
