const status = require('../src/health/routes');
const users = require('../src/users/routes');
const places = require('../src/places/routes');
const checkIfAuthenticated = require('../middlewares/validateAuth');

module.exports = (app) => {
  app.use('/status', status);
  app.use('/users', users);
  app.use('/places', checkIfAuthenticated, places);
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
