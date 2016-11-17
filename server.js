
'use strict';

// regular stuff
const express     = require('express');
const logger      = require('morgan');
const taskRouter  = require('./routes/task');
const home        = require('./routes/index');
const bodyParser = require('body-parser');

const app         = express();
const PORT        = process.env.port || 3000;
const isDev       = !('NODE_ENV' in process.env) && require('dotenv').config() && true;
// set up some logging
app.use(logger(isDev ? 'dev' : 'common'));
app.use(bodyParser.json());
// Let's go!
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!', next);
});

app.use('/', taskRouter);
app.use('/', home);


app.listen(PORT, console.log(process.env, isDev));
