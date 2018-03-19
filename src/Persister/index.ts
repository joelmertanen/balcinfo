import { getResults, persistResults } from '../RedisPersister';
import sendResults from './ResultsPersisterWeb';

async function persist() {
    const results = await getResults();
    if (!results) {
        return;
    }
    try {
        sendResults(results);
    } catch (e) {
        // network failure, re-persist
        // We expect the whole batch to be failed, which ain't perfect
        // However, I'm storing temperature data which has a timestamp, so whatever :)
        await persistResults(results);
    }
}

persist();
