'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const CardComponent = ({
	card,
	playerPosition,
	onCardClicks
}) => {
	let urlRoot = 'http://thewitcher3.wiki.fextralife.com/file/view/';
	let url = `${urlRoot}${card.imageFront}.jpg`;
	let onClick = onCardClicks || null;

	return (
		<li id={card.cardId} className="card js_card" onClick={onClick && onClick.bind(null, card.cardId, playerPosition)}>
		   <img className="cardImg" src={url} />
		</li>
	);
};

const mapStateToProps = (
	state,
	ownProps
) => {
	return {
		card: ownProps.card,
		playerPosition: ownProps.playerPosition
	}
};
const mapDispatchToProps = (
	dispatch
) => {
	return {
		onCardClicks: (cardId, playerPosition) => {
			return dispatch({
				type: 'PLAY_CARD',
				cardId,
				playerPosition
			});
		}
	};
};

const CardContainerComponent = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardComponent);


export { CardComponent, CardContainerComponent };
