'use strict';

const config = require ('../config.json');
const pg = require ('pg');

const options = {
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: '/cloudsql/' + config.INSTANCE_CONNECTION_NAME,
};

let pgPool;
try {
  pgPool = new pg.Pool (options);
} catch (e) {
  console.error (e);
}

async function list24h () {
  try {
    const response = await pgPool.query (
      "SELECT * FROM measurements WHERE timestamp > now() - interval '1 day' ORDER BY timestamp"
    );
    return response.rows;
  } catch (e) {
    console.error (e);
  }
}

async function listOneWeek () {
  try {
    const response = await pgPool.query (
      "SELECT * FROM measurements WHERE timestamp > now() - interval '1 week' ORDER BY timestamp"
    );
    return response.rows;
  } catch (e) {
    console.error (e);
  }
}

module.exports = {
  list24h: list24h,
  listOneWeek: listOneWeek,
};
