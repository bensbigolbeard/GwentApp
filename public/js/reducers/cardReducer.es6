'use strict';

import { _ } from '../lib/lodash';

let defaultCardData = {
	//'inPlay', 'discarded'
	boardPosition: 'inDeck',
	environmentalEffects: {
		weather: null,
		commandersHorn: null,
		support: null,
		muster: null,
		tightBond: null
	}
};

const generateCardId = function generateCardId() {
	let cardId = 'card_' + (
			Math.floor(Math.random() * 100) *
			Math.floor(Math.random() * 100)
		);
	return cardId;
};

const addCardReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_LEADER_CARD':
			return Object.assign({},
				action.cardData,
				{
					cardId: generateCardId()
				}
			);
		case 'ADD_CARD':
			return Object.assign({},
				defaultCardData,
				action.cardData,
				{
					hasSpecialAbility: !!action.cardData.specialAbility,
					cardId: generateCardId()
				}
			);
		default:
			return state;
	}
};

const cardsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CARD':
			return {
				leaders: action.cardData.leaders.map((card) => {
					return addCardReducer(null, { type: 'ADD_LEADER_CARD', cardData: card })
				}),
				troops: action.cardData.troops.map((card) => {
					return addCardReducer(null, { type: 'ADD_CARD', cardData: card })
				})
			}
		case 'GET_ALL_CARDS':
			return state;
		default:
			return state;
	}
};

const decksReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_DECKS':
			return Object.assign({},
				state,
				{
					decks: Object.keys(action.cardData).reduce((deckAcc, armyName) => {
						deckAcc[armyName] = cardsReducer(
							null,
							{ type: 'ADD_CARD', cardData: action.cardData[armyName] }
						);
						return deckAcc;
					}, {})
				}
			);
		default:
			return state;
	}
};

export { decksReducer };
