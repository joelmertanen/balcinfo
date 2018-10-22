import { Request, Response } from 'express';
import kms from '@google-cloud/kms';
import * as pg from 'pg';

const getSecrets = async () => {
  const kmsClient = new kms.v1.KeyManagementServiceClient();
  const request = {
    name: process.env.CRYPTO_KEY_PATH,
    ciphertext: process.env.ENCRYPTED_ENV,
  };

  return kmsClient.decrypt(request)
    .then(responses => {
      return JSON.parse(Buffer.from(responses[0].plaintext).toString());
    }).catch(e => {
      console.error(e);
    });
};

const secretsPromise = getSecrets();

function isUndefined(value) {
  return value === undefined;
}

let pgPool;

async function writeNewRecord(req, res) {
  // validate by parsing
  const timestamp = (new Date(req.body.timestamp)).toISOString();
  const temperature = Number.isFinite(parseFloat(req.body.temperature)) ? parseFloat(req.body.temperature) : undefined;
  const humidity = Number.isFinite(parseFloat(req.body.humidity)) ? parseFloat(req.body.humidity) : undefined;
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
  const secrets = await secretsPromise;

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
      if (req.body.key !== secrets['API_KEY']) {
        console.error('mismatch in api key: ', req.body);
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
