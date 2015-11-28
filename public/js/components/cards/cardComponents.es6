'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

const CardComponent = ({
	card
}) => {
	let urlRoot = 'http://thewitcher3.wiki.fextralife.com/file/view/';
	let url = `${urlRoot}${card.imageFront}.jpg`;
	return (
		<li id={card.cardId} className="card js_card">
		   <img className="cardImg" src={url} />
		</li>
	);
};

export { CardComponent };
