'use strict';

import { CardComponent } from '../cards/cardComponent';

const DiscardPileComponent = ({playerPosition}) => (
    <div className="discardPile js_discardPile_player{playerPosition}">
        <CardComponent card={card}/>
    </div>
);

export { DiscardPileComponent };
