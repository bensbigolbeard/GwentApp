'use strict';

const cardReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CONSTRUCT_CARD':
			return Object.assign({},
				action.sourceCard,
				action.cardMetadata
			);
		default:
			return state;
	}
};

export default function cardsReducer(state = {}, action) {
	switch (action.type) {
		case 'CONSTRUCT_CARDS': {
			let constructedCardList = [];
			action.cardList.forEach((cardId) => {
				let sourceCard = _.findWhere(action.sourceDeck, {id: cardId});
				let cardMetadata = _.findWhere(action.playerDeck, {id: cardId});

				constructedCardList = [
					...constructedCardList,
					cardReducer(null, {type: 'CONSTRUCT_CARD', sourceCard, cardMetadata})
				];
			})
		}
		default:
			return state;
	}
}
