'use strict';

import * as _ from 'lodash';

let playerCounter = 0;
export default function playerReducer(state = [], action) {
	switch (action.type) {
		case 'ADD_PLAYER': {

			return [
				...state,
				{
					id: state.length,
					deckId: null
				}
			];
		}
		case 'SELECT_DECK': {
			let newState = [...state];
			let newPlayerIndex = _.findIndex(newState, {id: action.playerId});
			let newPlayer = newState[newPlayerIndex];

			newPlayer = Object.assign({},
				newPlayer,
				{
					deckId: action.sourceDeckId
				}
			);

			newState = [
				...newState.slice(0, newPlayerIndex),
				newPlayer,
				...newState.slice(newPlayerIndex + 1)
			]

			return newState;
		}
		default:
			return state;
	}
}
