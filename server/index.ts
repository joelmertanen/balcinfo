import { Request, Response } from 'express';
import kms from '@google-cloud/kms';
import * as pg from 'pg';

let secrets;

const getSecrets = async () => {
  if (secrets) {
    return secrets;
  }
  const kmsClient = new kms.v1.KeyManagementServiceClient();
  var request = {
    name: process.env.CRYPTO_KEY_PATH,
    ciphertext: process.env.ENCRYPTED_ENV,
  };
  try {
    const responses = await kmsClient.decrypt(request)
    secrets = JSON.parse(Buffer.from(responses[0].plaintext).toString());
    return secrets;
  } catch (e) {
    console.error(e);
    return {};
  }
};

// populate
getSecrets();

function isUndefined(value) {
  return value === undefined;
}

let pgPool;

async function writeNewRecord(req, res) {
  // validate by parsing
  const timestamp = (new Date(req.body.timestamp)).toISOString();
  const temperature = Number.isFinite(parseInt(req.body.temperature, 10)) ? parseInt(req.body.temperature, 10) : undefined;
  const humidity = Number.isFinite(parseInt(req.body.humidity)) ? parseInt(req.body.humidity) : undefined;
  if (!timestamp ||
    isUndefined(temperature) ||
    isUndefined(humidity)
  ) {
    console.error('incorrect payload: ', timestamp, temperature, humidity);
    res.status(500).send({ error: 'Internal server error' });
    return;
  }

  const query = 'INSERT INTO measurements (timestamp, temperature, humidity) VALUES ($1, $2, $3)';
  await pgPool.query(query, [timestamp, temperature, humidity]);
  return res.status(200).send();
}

export const recordTemperature = async (req: Request, res: Response) => {
  // the secrets might not have been loaded yet. #onlyinhobbyprojects :))
  if (!secrets || !secrets['API_KEY']) {
    console.error('Could not find the secrets');
    await res.status(500).send({ error: 'Internal server error' });
    return;
  }

  if (!pgPool) {
    const connectionName = secrets['INSTANCE_CONNECTION_NAME'];
    const dbUser = secrets['DB_USER'];
    const dbPass = secrets['DB_PASSWORD'];
    const dbName = secrets['DB_NAME'];

    pgPool = new pg.Pool({
      max: 1,
      host: '/cloudsql/' + connectionName,
      user: dbUser,
      password: dbPass,
      database: dbName
    });
  }

  switch (req.method) {
    case 'POST':
      const allowedKey = secrets['API_KEY'];
      if (req.body.key !== allowedKey) {
        console.error('missing API key: ', req.body);
        await res.status(500).send({ error: 'Something blew up!' });
        return;
      }
      await writeNewRecord(req, res);
      break;
    default:
      await res.status(500).send({ error: 'Something blew up!' });
      break;
  }
};
