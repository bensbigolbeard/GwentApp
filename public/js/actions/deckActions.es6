'use strict';

const addCard = (cardData) => {
	return {
		type: 'ADD_CARD',
		cardData
	};
};
const addCards = (cardData) => {
	return {
		type: 'ADD_CARDS',
		cardData
	};
};
const addDecks = (cardData) => {
	return {
		type: 'ADD_DECKS',
		cardData
	};
};
const getCards = () => {
	return {
		type: 'GET_ALL_CARDS'
	};
};

export { addCard, addCards, getCards, addDecks };
