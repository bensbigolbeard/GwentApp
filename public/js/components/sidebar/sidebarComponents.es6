'use strict';

import { ActiveWeatherEffectsComponent } from 'weatherEffectsComponent';
import { LeaderCardComponent } from 'leaderCardComponent';
import { LivesComponent } from 'livesComponent';
import { DiscardPileComponent } from 'discardPileComponent';

const SidebarComponent = ({ side }) => {
    // TODO: refactor
    if (side === 'left') {
        return (
            <div className="sidebarContainer">
                <div className="sidebar">
                    <SidebarInfoComponent playerPosition='1'/>
                    <ActiveWeatherEffectsComponent card={card}/>
                    <SidebarInfoComponent playerPosition='2'/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="sidebarContainer">
                <div className="sidebar">
                    <DiscardPileComponent playerPosition='1'/>
                    <DiscardPileComponent playerPosition='2'/>
                </div>
            </div>
        );
    }
}
const SidebarInfoComponent = ({ playerPosition }) => (
    <div className="sidebarInfoContainer">
        <div className="js_sidebarInfo_player{playerPosition} sidebarInfo">
            <div className="playerInfo">
                <LeaderCardComponent />
                <LivesComponent />
            </div>
        </div>
    </div>
);

export { SidebarComponent };
