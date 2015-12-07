if (process.env.NODE_ENV === 'production') {
  module.exports = require('./app.production');
} else {
  module.exports = require('./app.development');
}
