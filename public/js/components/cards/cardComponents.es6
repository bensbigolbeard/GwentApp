'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import * as playerDeckActions from 'actions/playerDeckActions';

import * as _ from 'lodash';

const CardComponent = ({
	card,
	onCardClick
}) => {
	let urlRoot = 'http://thewitcher3.wiki.fextralife.com/file/view/';
	let url = `${urlRoot}${card.imageFront}.jpg`;
	let onClick = onCardClick || null;

	return (
		<li id={card.id} className="card js_card" onClick={onClick && onClick}>
		   <img className="cardImg" src={url} />
		</li>
	);
};

const CardRowComponent = ({
	rowName,
	rowPower,
	cards,
	onCardClickHandlers
}) => {
	let rowClassList = `cardRow ${rowName} js_${rowName}`;
	let cardsToPlay = cards.map((card, index) => {
		let key = `card_${index}`;
			return <CardComponent
				key={key}
				card={card}
				onCardClick={onCardClickHandlers[index]} />;
		});

	return (
		<div className="cardRowContainer">
			<ul className={rowClassList}>
				<li className="score card">{rowPower}</li>
				{cardsToPlay}
			</ul>
		</div>
	);
};

const mapStateToProps = (
	state
) => {
	return {
		playerDecks: state.playerDecks,
		sourceDecks: state.sourceDecks
	}
};
// make this a reducer and assign to card metadata so data is available by the time we read from store
function calculateCardPower(card) {
	let power = card.power;
	let envEffects = card.environmentalEffects;

	if (envEffects.tightBond) {
		power *= envEffects.tightBond;
	}
	if (envEffects.weather) {
		power = 1;
	}
	if (envEffects.support) {
		power += 1;
	}
	if (envEffects.commandersHorn) {
		power *= 2;
	}

	return power;
}
const mergeProps = (stateProps, dispatchProps, ownProps) => {
	let isHandRow = ownProps.rowName === 'hand';
	let playerDeck = stateProps.playerDecks[ownProps.playerDeckId];
	let sourceDeck = stateProps.sourceDecks[playerDeck.sourceDeckId];
	let cards = cardListConstructor(ownProps.cardIds, sourceDeck, playerDeck);
	let dispatchActions = [];
	let rowPower = isHandRow ? {} : { value: 0 };

	cards.forEach((card) => {
		if (isHandRow) {
			dispatchActions = [
				...dispatchActions,
				() => dispatchProps.playCard(card.id, ownProps.playerDeckId)
			];
		} else {
			console.log('****rowPower', rowPower);
			rowPower.value += calculateCardPower(card);
		}
	});

	function cardListConstructor(cardIdsList, sourceDeck, playerDeck) {
		let constructedCardList = [];

		cardIdsList.forEach((cardId) => {
			let sourceCard = _.findWhere(sourceDeck.units, {id: cardId});
			let cardMetadata = _.findWhere(playerDeck.units, {id: cardId});

			return constructedCardList = [
				...constructedCardList,
				Object.assign({},
					sourceCard,
					cardMetadata.state
				)];
		});

		return constructedCardList;
	};

	return Object.assign({},
		{
			onCardClickHandlers: dispatchActions,
			rowName: ownProps.rowName,
			rowPower: rowPower.value,
			cards
		}
	);
};

const CardRowContainerComponent = connect(
	mapStateToProps,
	playerDeckActions,
	mergeProps
)(CardRowComponent);

export { CardComponent, CardRowContainerComponent };
