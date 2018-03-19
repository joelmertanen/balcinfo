import rp from 'request-promise';
import config from '../../config.json';
import { PersistedResult} from '../RedisPersister';

const options = {
    uri: config.uri,
    method: 'POST',
    headers: {
        'x-api-key': config.apiKey
    },
    json: true
};

const sendResults = async (results: Array<PersistedResult>) => {
    results.forEach(async result => {
        const payload = {
            timestamp: (new Date()).toJSON(),
            temperature: result.temperature,
            humidity: result.humidity
        };

        const request = Object.assign({}, options, { body: payload });
        await rp(request);
    })
};

export default sendResults;
