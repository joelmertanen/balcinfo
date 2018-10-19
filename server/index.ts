import { Request, Response } from 'express';
import * as pg from 'pg';

const connectionName = process.env.INSTANCE_CONNECTION_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const allowedKey = process.env.API_KEY;

const pool = new pg.Pool({
  max: 1,
  host: '/cloudsql/' + connectionName,
  user: dbUser,
  password: dbPass,
  database: dbName
});

function isUndefined(value) {
  return value === undefined;
}

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
  await pool.query(query, [timestamp, temperature, humidity]);
  return res.status(200).send();
}

export const recordTemperature = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'POST':
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
