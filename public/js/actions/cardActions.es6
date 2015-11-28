'use strict';

const addCardAction = (cardData) => {
	return {
		type: 'ADD_CARD',
		cardData: {
			...cardData
		}
	};
};
const getCardsAction = () => {
	return {
		type: 'GET_ALL_CARDS'
	};
};

export { addCardAction, getCardsAction };
