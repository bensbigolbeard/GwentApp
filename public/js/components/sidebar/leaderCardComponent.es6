'use strict';

import { CardComponent } from '../cards/cardComponent';

const LeaderCardComponent = () => (
    <div className="leaderCardContainer">
        <ul className="leaderCard js_leaderCard">
            <CardComponent />
        </ul>
    </div>
);

export { LeaderCardComponent };
