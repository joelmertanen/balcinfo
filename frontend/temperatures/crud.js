'use strict';

const model = require ('./model-cloudsql');

const express = require ('express');

const router = express.Router ();

// Set Content-Type for all responses for these routes
router.use ((req, res, next) => {
  res.set ('Content-Type', 'text/html');
  next ();
});

const tempMeasures = measurements =>
  measurements.map (m => ({
    x: m.timestamp,
    y: m.temperature,
  }));

const humidityMeasures = measurements =>
  measurements.map (m => ({
    x: m.timestamp,
    y: m.humidity,
  }));

router.get ('/', async (_, res) => {
  const measurements = await model.list24h ();
  res.render ('temperatures/list.pug', {
    temperatures: tempMeasures (measurements),
    humidity: humidityMeasures (measurements),
  });
});

router.get ('/week', async (_, res) => {
  const measurements = await model.listOneWeek ();
  res.render ('temperatures/list.pug', {
    temperatures: tempMeasures (measurements),
    humidity: humidityMeasures (measurements),
  });
});

/**
 * Errors on "/books/*" routes.
 */
router.use ((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next (err);
});

module.exports = router;
