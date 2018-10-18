import rp from 'request-promise';
import config from '../../config.json';
import { PersistedResult} from '../RedisPersister';

const options = {
  uri: config.uri,
  method: 'POST',
  json: true
};

const sendResults = async (results: Array<PersistedResult>) => {
  results.forEach(async result => {
    const payload = {
      key: config.apiKey,
      timestamp: result.timestamp,
      temperature: result.temperature,
      humidity: result.humidity
    };

    const request = Object.assign({}, options, { body: payload });
    try {
      await rp(request);
    } catch (e) {
      console.error('Failed to persist: ', e);
      throw new Error('failed to persist results');
    }
  })
};

export default sendResults;
