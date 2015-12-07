'use strict';

import { playerDecksReducer } from 'reducers/playerDecksReducer';

// Actions
import * as deckActions from 'actions/deckActions';

// make better plz
let counter = 0;
const generateCardId = function generateCardId() {
	let cardId = //'card_' + (
			//Math.floor(Math.random() * 100) *
			//Math.floor(Math.random() * 100)
			counter++;
		//);
	return cardId;
};

const addCardReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_LEADER_CARD': {
			let newCardInfo = state && state.id ?
				{} :
				{ id: generateCardId() };

			return Object.assign({},
				action.cardData,
				newCardInfo
			);
		}
		case 'ADD_CARD': {
			let newCardInfo = state && state.id ?
				{} :
				{
					hasSpecialAbility: !!action.cardData.specialAbility,
					id: generateCardId()
				};

			return Object.assign({},
				state,
				action.cardData,
				newCardInfo
			);
		}
		default:
			return state;
	}
};

const cardListReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_CARDS':
			return [
				...state,
				...action.cardData.map((card) => {
					return addCardReducer(
						card,
						{ type: 'ADD_CARD', cardData: { boardPosition: action.boardPosition }}
					);
				})
			];
		default:
			return state;
	}
};

const factionCardsReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CARDS': {
			let newDeck = {
				leaders: [],
				units: []
			};
			return action.cardData.reduce((deckAcc, card) => {
				let cardCategory = card.isLeader ? 'leaders' : 'units';
				let cardAction = card.isLeader ? 'ADD_LEADER_CARD' : 'ADD_CARD';

				deckAcc[cardCategory] = [
					...deckAcc[cardCategory],
					addCardReducer(null, {type: cardAction, cardData: card})
				];

				return deckAcc;
			}, newDeck);
		}
		case 'GET_ALL_CARDS':
			return state;
		default:
			return state;
	}
};

const deckReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_DECK': {
			let newState = {};
			newState = Object.assign({},
				{
					id: action.deckId,
					name: action.factionName
				},
				factionCardsReducer(null, deckActions.addCards(action.cardData))
			);
console.log('****newState', newState);
			return newState;
		}
		default:
			return state;
	}
};

export default function decksReducer(state = [], action) {
	switch (action.type) {
		case 'ADD_DECKS': {
			let deckId = 0;
			return Object.keys(action.cardData).reduce((decksAcc, factionName) => {
					if (factionName !== 'neutral') {
						let cardData = [
							...action.cardData[factionName],
							...action.cardData.neutral
						];
						decksAcc = [
							...decksAcc,
							deckReducer(null, {
								type: 'ADD_DECK',
								deckId: deckId++,
								cardData,
								factionName
							})
						];
					}

					return decksAcc;
				}, []);
		}
		default:
			return state;
	}
}

export { cardListReducer };
