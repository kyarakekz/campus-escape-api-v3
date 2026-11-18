// Builds the Express app. Does NOT start listening - server.js does that.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const env = require('./config/env');
const routes = require('./routes');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');

const app = express();

// Middleware runs in this order for every request.
if (env.nodeEnv !== 'test') app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: env.corsOrigins }));

// Hub Contract: every endpoint lives under /api/v1
app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;