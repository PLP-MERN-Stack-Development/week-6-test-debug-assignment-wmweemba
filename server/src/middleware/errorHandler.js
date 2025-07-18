const logger = require('../logger');

function errorHandler(err, req, res, next) {
  logger.error(err.stack || err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler; 