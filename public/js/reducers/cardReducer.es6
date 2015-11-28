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

const generateCardId = function generateCardId(state, retries = 2) {
	let cardId = 'card_' + (
			Math.floor(Math.random() * 100) *
			Math.floor(Math.random() * 100)
		);
	if (_.where(state, {cardId}).length) {
		console.log(retries);
		if (retries > 0) {
			return generateCardId(state, retries - 1);
		} else {
			return 'wowThisIsExtremelyUnlikely';
		}
	}
	return cardId;
}

const addCardReducer = (state = defaultCardData, action) => {
	// revisit how this is constructed
	return {
		...state,
		...action.cardData,
		hasSpecialAbility: !!state.specialAbility,
		cardId: generateCardId(state)
	};
};

const cardsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CARD':
			return [
				...state,
				addCardReducer(state, action)
			];
		case 'GET_ALL_CARDS':
			return state;
		default:
			return state;
	}
};

export { cardsReducer };
