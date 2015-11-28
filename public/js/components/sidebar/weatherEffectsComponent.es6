'use strict';

const ActiveWeatherEffectsComponent = ({card}) => (
    <ul className="cardRow js_weatherCards">
        <CardComponent card={card}/>
    </ul>
);

export { ActiveWeatherEffectsComponent };
