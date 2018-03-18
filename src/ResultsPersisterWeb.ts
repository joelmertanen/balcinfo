import rp from 'request-promise';
import config from '../config.json';

const options = {
    uri: config.uri,
    method: 'POST',
    headers: {
        'x-api-key': config.apiKey
    },
    json: true
};

const sendResults = (results: ReadingData) => {
    const payload = {
        timestamp: (new Date()).toJSON(),
        temperature: results.temperature,
        humidity: results.humidity
    };

    const request = Object.assign({}, options, {body: payload});
    return rp(request);
};

export default sendResults;
