'use strict';

import { decksReducer } from 'reducers/cardReducer';
import { handReducer } from 'reducers/handReducer';
import * as _ from 'lodash';

const defaultPlayerData = {
	deck: []
};

const playCard = (state = [], action) => {
	switch (action.type) {
		case 'PLAY_CARD': {
			let indexOfCard = _.findIndex(state, 'cardId', action.cardId);
			if (indexOfCard) {
				let cardToUpdate = _.where(state, {cardId: action.cardId})[0];

				return [
					...state.slice(0, indexOfCard),
					Object.assign({},
						cardToUpdate,
						{
							boardPosition: 'inPlay'
						}
					),
					...state.slice(indexOfCard + 1)
				];
			} else {
				return state;
			}
		}
		default:
			return state;
	}
};
export default function playerReducer(state = {}, action) {
	switch (action.type) {
		case 'ADD_PLAYER':
			return Object.assign({}, state, {
				[action.playerPosition]: Object.assign({}, defaultPlayerData)
			});
		case 'SELECT_DECK':
			// for now this will just assign the name of the faction, later it will hold references to the cards that
			// the player has selected before the match
			return Object.assign({},
				state,
				{
					[action.playerPosition]: Object.assign({},
						state[action.playerPosition],
						{
							deck: action.deck
						})
				}
			);
		case 'DRAW_HAND': {
			let newState = Object.assign({}, state);
			let newDeck = handReducer(state[action.playerPosition] , {
				type: action.type,
				deck: state[action.playerPosition].deck
			});

			newState[action.playerPosition].deck = newDeck;

			return newState;
		}
		case 'PLAY_CARD': {
			let newState = Object.assign({}, state);
			let oldDeck = state[action.playerPosition].deck;
			let newDeck = playCard(oldDeck, {
					type: action.type,
					cardId: action.cardId
				});

			newState[action.playerPosition].deck = newDeck;

			return newState;
		}

		default:
			return state;
	}
}
