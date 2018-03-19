import config from '../config.json';
const { promisify } = require('util');
const redis = require('redis');
const client = redis.createClient();
const lpush = promisify(client.lpush).bind(client);
const lpop = promisify(client.lpop).bind(client);

interface PersistedResult {
    timestamp: string;
    temperature: string;
    humidity: string;
};

async function getResults(): Promise<Array<PersistedResult>> {
    let results: Array<string> = [];
    let result;
    while (result = await lpop(config.queueName)) {
        console.log('found result: ', result);
        results.push(result);
    }
    return results.map(result => JSON.parse(result));
};

async function persistReadingData(result: ReadingData) {
    const data: PersistedResult = {
        timestamp: result.timestamp,
        temperature: result.temperature.toFixed(2),
        humidity: result.humidity.toFixed(2)
    };
    await lpush(config.queueName, JSON.stringify(data));
};

async function persistResults(results: Array<PersistedResult>) {
    results.forEach(async result => {
        await lpush(config.queueName, JSON.stringify(result));
    })
}

export { getResults, persistReadingData, persistResults, PersistedResult };