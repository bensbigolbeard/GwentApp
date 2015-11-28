'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { CardComponent } from '../cards/cardComponents';

const CardRowComponent = ({
	rowName,
	cards
}) => {
	console.log('****cards', cards);
	let cardsToPrint = cards.map((card) => {
			return <CardComponent key={card.cardId} card={card} />;
		});
	let rowClassList = `cardRow ${rowName} js_${rowName}`;
	console.log(cardsToPrint);
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

const PlayerFieldComponent = ({ playerPosition }) => {
	let defaultRowOrder = ['hand', 'siege', 'ranged', 'melee'];
	let rowsToMap = playerPosition == 1 ? defaultRowOrder : defaultRowOrder.reverse();

	let rows = rowsToMap.map((rowName) => {
			return <CardRowComponent rowName={rowName} />;
		});

	return (
		<div id="js_playerField{playerPosition}" className="playerField">
			{rows}
		</div>
	);
};

const PlayerFieldsComponent = ({ side }) => (
    <div className="playerFieldsContainer">
        <PlayerFieldComponent />
    </div>
);

export { PlayerFieldsComponent, CardRowComponent };
