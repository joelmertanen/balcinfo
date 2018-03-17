import readTemperature from './Temperature';

readTemperature()
    .then(temp => console.log(temp))
    .catch(e => console.error(`error: ${e}`));
