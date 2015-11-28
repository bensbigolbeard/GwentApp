'use strict';

const LifeComponent = () => (
    <li className="lifeContainer">
        <div className="js_life life {isActive ? 'active' : ''}"></div>
    </li>
);
const LivesComponent = () => (
    <div className="livesContainer">
        <ul className="lives js_lives">
            <LifeComponent isActive="true" />
            <LifeComponent isActive="true" />
        </ul>
    </div>
);

export { LivesComponent, LifeComponent };
