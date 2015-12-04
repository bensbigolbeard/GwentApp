'use strict';

import * as _ from 'lodash';
import { cardListReducer } from 'reducers/cardReducer';

const defaultHandData = {
	cards: [],
	redraws: 2
};

const drawHand = (deck) => {
	const cardCount = 10;
	let newDeck = [...deck];

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
		newDeck = drawCard(newDeck);
	}

	return newDeck;
};

function drawCard(deck) {
	let troops = deck.filter((card) => {
			return !card.isLeader;
		});
	let drawnCardDetails = getRandomCard();

	function getRandomCard() {
		let randNum = Math.floor(Math.random() * troops.length);
		let drawnCard = troops[randNum];

		// redraw if the random card is already in our hand
		if (drawnCard.boardPosition === 'inHand') {
			return getRandomCard();
		} else {
			drawnCard.boardPosition = 'inHand';
			return {
				drawnCard,
				randNum
			};
		}
	}
	troops[drawnCardDetails.randNum] = drawnCardDetails.drawnCard;

	return [
		...deck.filter((card) => card.isLeader),
		...troops
	];
}
const handReducer = (state = {}, action) => {
	switch (action.type) {
		case 'DRAW_HAND':
			return drawHand(action.deck);
		case 'GET_HAND':
			return state.deck.filter((card) => {
				return card.boardPosition === 'inHand';
			});
		default:
			return state;
	}
};

export { handReducer };
