'use strict';

const express = require ('express');
const bodyParser = require ('body-parser');

const router = express.Router ();

// Automatically parse request body as JSON
router.use (bodyParser.json ());

router.get ('/', (req, res, next) => {
  res.json ({});
});

module.exports = router;
