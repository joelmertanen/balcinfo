import config from '../config.json';
const { promisify } = require('util');
const redis = require('redis');
const client = redis.createClient();
const lPush = promisify(client.lpush).bind(client);
const lRange = promisify(client.lrange).bind(client);

interface PersistedResult {
    timestamp: string;
    temperature: string;
    humidity: string;
};

async function getResults(): Promise<Array<PersistedResult>> {
    const results: Array<string> = await lRange(config.queueName, 0, -1);
    return results.map(result => JSON.parse(result));
};

async function persistReadingData(result: ReadingData) {
    const data: PersistedResult = {
        timestamp: result.timestamp,
        temperature: result.temperature.toFixed(2),
        humidity: result.humidity.toFixed(2)
    };
    await lPush(config.queueName, JSON.stringify(data));
};

async function persistResults(results: Array<PersistedResult>) {
    results.forEach(async result => {
        await lPush(config.queueName, JSON.stringify(result));
    })
}

export { getResults, persistReadingData, persistResults, PersistedResult };