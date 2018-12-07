const models = require('../models');
const ElderGod = models.ElderGod;

// renders gamepage with csrfToken and the god name
const gamePage = (req, res) =>
  /*
  ElderGod.ElderGodModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    // put if here to check for json or html. If json, do res.json, if html, do res.render
    return res.render('app', { csrfToken: req.csrfToken(), gods: docs });
  });
  */
   res.render('app');

// makes a new game. Is called by Account controller at signup
const newGame = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'A name is required' });
  }
  const initData = {
    name: req.body.name,
    owner: req.session.account._id,
  };

  const newGod = new ElderGod.ElderGodModel(initData);

  const elderGodPromise = newGod.save();
  elderGodPromise.then(() => res.json({ redirect: '/game' }));

  elderGodPromise.catch((err) => {
    console.log(err);
    return res.status(400).json({ error: 'an error occured' });
  });

  return elderGodPromise;
};

// gets data about the god by the god's id
const getData = (req, res) => ElderGod.ElderGodModel.findById(req.query.id, (err, doc) => {
  if (err) {
    console.dir(err);
    return res.json({ err }); // if error, return it
  }

  if (!doc) {
    return res.json({ error: 'No god found' });
  }

  return res.json(doc);
});

const getGod = (req, res) =>
ElderGod.ElderGodModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured' });
  }

  return res.json({ god: docs });
});

// records player's current score of all numbers
const saveGame = (req, res) => {
  const updatedGod = {
    id: req.body.id,
    pps: req.body.pps,
    totalPraise: req.body.totalPraise,
    cultists: req.body.fish,
    shoggoths: req.body.shogs,
    deepones: req.body.deepones,
    starspawn: req.body.starspawn,
    elderthings: req.body.things,
    buff1: req.body.buff1,
    buff2: req.body.buff2,
    buff3: req.body.buff3,
  };

  return ElderGod.ElderGodModel.findById(updatedGod.id, (err, doc) => {
    if (err) {
      return res.json({ err }); // if error, return it
    }

    if (!doc) {
      return res.json({ error: 'No god found' });
    }

    const newGod = doc;

    newGod.pps = updatedGod.pps;
    newGod.totalPraise = updatedGod.totalPraise;
    newGod.numCultists = updatedGod.cultists;
    newGod.numShog = updatedGod.shoggoths;
    newGod.numDeepOnes = updatedGod.deepones;
    newGod.numStarspawn = updatedGod.starspawn;
    newGod.numElderThings = updatedGod.elderthings;
    newGod.numBlessing1 = updatedGod.buff1;
    newGod.numBlessing2 = updatedGod.buff2;
    newGod.numBlessing3 = updatedGod.buff3;

    const savePromise = newGod.save();

    savePromise.then(() => res.json({ message: 'Your influence has been recorded' }));

    savePromise.catch(() => res.json({ err }));

    return res;
  });
};

// shows leaderboard page, sorts all gods by total praise, then lists them out using react
const getLeaderboard = (req, res) => {
  ElderGod.ElderGodModel.find({}, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    docs.sort((a, b) => b._doc.totalPraise - a._doc.totalPraise);
    return res.json({ gods: docs });
  });
};

module.exports.gamePage = gamePage;
module.exports.newGame = newGame;
module.exports.saveGame = saveGame;
module.exports.getData = getData;
module.exports.getLeaderboard = getLeaderboard;
module.exports.getGod = getGod;
