'use strict';

import { cardListReducer } from 'reducers/decksReducer';
import cardCombiner from 'reducers/playerDecksReducer';

import { playerDeckActions } from 'actions/playerDeckActions';


const drawHand = (units) => {
	const cardCount = 10;
	let hand = [];
	//function sortCardsByPower(cardA, cardB) {
	//	if (cardA.power < cardB.power) {
	//		return -1;
	//	} else if (cardA.power > cardB.power) {
	//		return 1;
	//	} else {
	//		return 0;
	//	}
	//}
	//
	//function sortCardsByHero(cardA, cardB) {
	//	if (cardA.isHero && !cardB.isHero) {
	//		return 1;
	//	} else if (!cardA.isHero && cardB.isHero) {
	//		return -1;
	//	} else {
	//		return 0;
	//	}
	//}

	for (let i = 0; i < cardCount; i++) {
		hand = drawCard(units, hand);
	}

	return hand;
};

function drawCard(units, hand) {
	let drawnCardId = getRandomCard();

	function getRandomCard() {
		let randNum = Math.floor(Math.random() * units.length);
		let drawnCard = units[randNum];

		// redraw if the random card is already in our hand
		if (hand.indexOf(drawnCard.id) === -1) {
			return drawnCard.id;
		} else {
			return getRandomCard();
		}
	}

	return [
		...hand,
		drawnCardId
	];
}

const playCard = (state = [], action) => {
	switch (action.type) {
		case 'PLAY_CARD': {
			let newState = Object.assign({}, state);
			let inHandIndex = newState.inHand.indexOf(action.id);

			newState.inPlay = [
				...newState.inPlay,
				action.id
			];
			newState.inHand = [
				...newState.inHand.slice(0, inHandIndex),
				...newState.inHand.slice(inHandIndex + 1)
			];
			newState.inDeck = calculateInDeck(newState);

			return newState;
		}
		default:
			return state;
	}
};

const addCardDetails = (units) => {
	return units.map((card) => {
		return {
			id: card.id,
			state: {
				environmentalEffects: {
					weather: null,
					commandersHorn: null,
					support: null,
					muster: null,
					tightBond: null
				}
			}
		};
	});
};
let deckCounter = 0;
const calculateInDeck = (playerDeck) => {
	let notInDeck = [
		...playerDeck.inHand,
		...playerDeck.inPlay,
		...playerDeck.inDiscard
	];

	return playerDeck.inDeck.filter((cardId) => {
		return notInDeck.indexOf(cardId) === -1;
	});
};
export default function playerDecksReducer(state = {}, action) {
	switch (action.type) {
		case 'GET_HAND':
			return state.deck.filter((card) => {
				return card.boardPosition === 'inHand';
			});
		case 'SELECT_DECK': {
			let units = addCardDetails(action.sourceDeck.units);

			let newState =  [
				...state,
				{
					id: deckCounter++,
					playerId: action.playerId,
					sourceDeckId: action.sourceDeckId,
					units: units,
					redraws: 2,
					inHand: [],
					inPlay: [],
					inDiscard: [],
					inDeck: units.reduce((unitIdList, unit) => {
						return [...unitIdList, unit.id];
					})
				}
			];

			return newState;
		}
		case 'DRAW_HAND': {
			let newState = [...state];
			let playerDeck = newState[action.playerDeckId];
			let hand = drawHand(playerDeck.units);

			playerDeck.inHand = hand;
			playerDeck.inDeck = calculateInDeck(playerDeck);

			return newState;
		}
		case 'PLAY_CARD': {
			let newState = [...state];
			let newPlayerDeck = playCard(newState[action.playerDeckId], {
					type: action.type,
					id: action.cardId
				});

			newState[action.playerDeckId] = newPlayerDeck;

			return newState;
		}
		case 'CONSTRUCT_CARDS':
			return cardCombiner(null, playerDeckActions.constructCard(action.sourceCard, action.cardMetadata));
		default:
			return state;
	}
};
