'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { CardRowContainerComponent } from '../cards/cardComponents';

import * as _ from 'lodash';

const PlayerFieldComponent = ({
	playerId,
	playerDeck,
	sourceDeck
}) => {
	let defaultRowOrder = ['hand', 'siege', 'ranged', 'melee'];
	let rowsToMap = playerId == 0 ? defaultRowOrder : defaultRowOrder.reverse();
	let playerFieldId = `js_playerField${playerId}`;
	let rows = [];

	function getCardRowIds(cardIds, sourceDeckUnits, rowName) {
		return cardIds.filter((cardId) => {
			let card = _.findWhere(sourceDeckUnits, {id: cardId});

			return card && card.category === rowName
		})
	}

	rows = rowsToMap.map((rowName, index) => {
		let key = `field_${index}`;
		let cardIdsForRow;

		// TODO: use React-Redux to format this data?
		if (rowName === 'hand') {
			cardIdsForRow = playerDeck.inHand;
		} else {
			cardIdsForRow = getCardRowIds(playerDeck.inPlay, sourceDeck.units, rowName);
		}

		return <CardRowContainerComponent key={key} rowName={rowName} cardIds={cardIdsForRow} playerDeckId={playerDeck.id} />;
	});

	return (
		<div id={playerFieldId} className="playerField">
			{rows}
		</div>
	);
};

const PlayerFieldsComponent = ({
	sourceDecks,
	players,
	playerDecks
}) => {
	let playerFields = players.map((player, index) => {
		let key = `fields_${index}`;
		let playerDeck = playerDecks[player.deckId];
		return <PlayerFieldComponent key={key} playerId={player.id} playerDeck={playerDeck} sourceDeck={sourceDecks[playerDeck.sourceDeckId]} />
	});

	return (
		<div className="playerFieldsContainer">
		{playerFields}
		</div>
	);
};

export { PlayerFieldsComponent };
