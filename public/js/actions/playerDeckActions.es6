'use strict';

const addPlayerDeck = () => {
	return {
		type: 'SELECT_DECK',

	};
};
const constructCard = (sourceCard, cardMetadata) => {
	return {
		type: 'CONSTRUCT_CARD',
		sourceCard,
		cardMetadata
	};
}
const playCard = (cardId, playerDeckId) => {
	return {
		type: 'PLAY_CARD',
		cardId,
		playerDeckId
	};
}
export { addPlayerDeck, constructCard, playCard };
