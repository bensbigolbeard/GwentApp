'use strict';

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
// make better plz
let counter = 0;
const generateCardId = function generateCardId() {
	let cardId = 'card_' + (
			//Math.floor(Math.random() * 100) *
			//Math.floor(Math.random() * 100)
			counter++
		);
	return cardId;
};

const addCardReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_LEADER_CARD': {
			let newCardInfo = state && state.cardId ?
				{} :
				{ cardId: generateCardId() };

			return Object.assign({},
				action.cardData,
				newCardInfo
			);
		}
		case 'ADD_CARD': {
			let newCardInfo = state && state.cardId ?
				{} :
				{
					hasSpecialAbility: !!action.cardData.specialAbility,
					cardId: generateCardId()
				};

			return Object.assign({},
				defaultCardData,
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
		case 'ADD_CARDS':
			return action.cardData.map((card) => {
					let addCardAction = card.isLeader ? 'ADD_LEADER_CARD' : 'ADD_CARD';

					return addCardReducer(null, {type: addCardAction, cardData: card})
				});
		case 'GET_ALL_CARDS':
			return state;
		default:
			return state;
	}
};

export default function decksReducer(state = {}, action) {
	switch (action.type) {
		case 'ADD_DECKS':
			return Object.assign({},
				state,
				Object.keys(action.cardData).reduce((deckAcc, factionName) => {
					if (factionName !== 'neutral') {
						deckAcc[factionName] = factionCardsReducer(
							null,
							{
								type: 'ADD_CARDS',
								cardData: [
									...action.cardData[factionName],
									...action.cardData.neutral
								]
							}
						);
					}
					return deckAcc;
				}, {})
			);
		default:
			return state;
	}
}

export { cardListReducer };
