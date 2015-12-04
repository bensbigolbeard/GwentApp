'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { CardComponent, CardContainerComponent } from '../cards/cardComponents';

const CardRowComponent = ({
	rowName,
	playerPosition,
	cards
}) => {

	let cardsToPlay = cards.map((card) => {
			if (card.boardPosition === 'inHand') {
				return <CardContainerComponent key={card.cardId} card={card} playerPosition={playerPosition} />;
			}
			return <CardComponent key={card.cardId} card={card} />;
		});
	let rowClassList = `cardRow ${rowName} js_${rowName}`;

	return (
		<div className="cardRowContainer">
			<ul className={rowClassList}>
				<li className="js_score score filler"></li>
				{cardsToPlay}
				<li className="filler"></li>
			</ul>
		</div>
	);
};

const PlayerFieldComponent = ({
	playerPosition,
	cards
}) => {
	let defaultRowOrder = ['hand', 'siege', 'ranged', 'melee'];
	let rowsToMap = playerPosition == 1 ? defaultRowOrder : defaultRowOrder.reverse();
	let playerFieldId = `js_playerField${playerPosition}`;

	let rows = rowsToMap.map((rowName, index) => {
		let key = `row_${index}`;
		let cardsForRow;

		// TODO: use React-Redux to format this data?
		if (rowName === 'hand') {
			cardsForRow = cards.filter((card) => {
				return card.boardPosition === 'inHand';
			});
		} else {
			cardsForRow = cards.filter((card) => {
				return card.boardPosition === 'inPlay' && card.category === rowName;
			});
		}

		return <CardRowComponent key={key} rowName={rowName} cards={cardsForRow} playerPosition={playerPosition}/>;
	});

	return (
		<div id={playerFieldId} className="playerField">
			{rows}
		</div>
	);
};

const PlayerFieldsComponent = ({ players }) => {
	return (
		<div className="playerFieldsContainer">
			<PlayerFieldComponent playerPosition="1" cards={players['1'].deck} />
			<PlayerFieldComponent playerPosition="2" cards={players['2'].deck} />
		</div>
	);
};

export { PlayerFieldsComponent };
