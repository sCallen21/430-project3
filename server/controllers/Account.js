const models = require('../models');
const elderGod = require('./ElderGod.js');

const Account = models.Account;

// renders all pages and sends csrf token when needed
const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const changePWPage = (req, res) => {
  res.render('changePassword', { csrfToken: req.csrfToken() });
};

const notFound = (req, res) => {
  res.render('notFound');
};

const rulesPage = (req, res) => {
  res.render('rules');
};

// destroys current session and goes to the login page
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// logs into the user's account
const login = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/game' });
  });
};

// signs up to create a new user
const signup = (request, response) => {
  const req = request;
  const res = response;

  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;
  req.body.name = `${req.body.name}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2 || !req.body.name) {
    return res.status(400).json({ error: 'All fields required!' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords must match!' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    // saving the promise sends the god name to the
    // elder god controller to make a new god for the new player
    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      return elderGod.newGame(req, res);
    });

    savePromise.catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use' });
      }

      return res.status(400).json({ error: 'An error occured' });
    });
  });
};

// changes user's password
const changePW = (request, response) => {
  const req = request;
  const res = response;

  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields required!' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords must match!' });
  }

  return Account.AccountModel.findByUsername(req.session.account.username, (err, doc) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    const acct = doc;

    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
      // creates a new hash and salt for the new password
      acct.password = hash;
      acct.salt = salt;

      const savePromise = acct.save();

      savePromise.then(() => res.json({ message: 'Password updated' }));

      savePromise.catch(() => res.json({ err }));

      return res;
    });
  });
};

// used to get csrf token when needed
const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.changePWPage = changePWPage;
module.exports.changePW = changePW;
module.exports.rules = rulesPage;
module.exports.notFound = notFound;
module.exports.getToken = getToken;
