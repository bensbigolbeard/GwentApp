'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { CardComponent } from '../cards/cardComponents';

const CardRowComponent = ({
	rowName,
	cards
}) => {

	let cardsToPrint = cards.map((card) => {
			return <CardComponent key={card.cardId} card={card} />;
		});
	let rowClassList = `cardRow ${rowName} js_${rowName}`;

	return (
		<div className="cardRowContainer">
			<ul className={rowClassList}>
				<li className="js_score score filler"></li>
				{cardsToPrint}
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

	let rows = rowsToMap.map((rowName, index) => {
		let key = `row_${index}`
			return <CardRowComponent key={key} rowName={rowName} cards={cards} />;
		});
	let rowId = `js_playerField${playerPosition}`;
	return (
		<div id={rowId} className="playerField">
			{rows}
		</div>
	);
};

const PlayerFieldsComponent = ({ cards }) => (
	<div className="playerFieldsContainer">
		<PlayerFieldComponent playerPosition="1" cards={cards} />
		<PlayerFieldComponent playerPosition="2" cards={cards} />
	</div>
);

export { PlayerFieldsComponent };
