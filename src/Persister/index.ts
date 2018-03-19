import { getResults, persistResults } from '../RedisPersister';
import sendResults from './ResultsPersisterWeb';

async function persist() {
    console.log(`Starting reading of the results`);
    const results = await getResults();
    console.log(`Found ${results.length} results from DB`);
    if (!results) {
        return;
    }
    try {
        sendResults(results);
        console.log(`Successfully stored the results to web`);
    } catch (e) {
        // network failure, re-persist
        // We expect the whole batch to be failed, which ain't perfect
        // However, I'm storing temperature data which has a timestamp, so whatever :)
        await persistResults(results);
    }
}

persist();
