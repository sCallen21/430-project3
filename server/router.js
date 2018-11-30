const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/getGod', mid.requiresLogin, controllers.ElderGod.getGod);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  // app.get('/changePW', mid.requiresSecure,
  //        mid.requiresLogin, controllers.Account.changePWPage);
  app.post('/changePW', mid.requiresSecure, mid.requiresLogin, controllers.Account.changePW);
  app.get('/game', mid.requiresLogin, controllers.ElderGod.gamePage);
  app.post('/game', mid.requiresLogin, controllers.ElderGod.newGame);
  app.post('/gameSave', mid.requiresLogin, controllers.ElderGod.saveGame);
  // app.get('/rules', mid.requiresLogin, controllers.Account.rules);
  // app.get('/leaderboard', mid.requiresLogin, controllers.ElderGod.leaderboard);
  app.get('/getData', mid.requiresLogin, controllers.ElderGod.getData);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/*', controllers.Account.notFound);
};

module.exports = router;
