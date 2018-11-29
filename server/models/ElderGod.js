const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ElderGodModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ElderGodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  pps: { // praise per second, the amount of praise the player is earning per second
    type: Number,
    default: 0,
  },
  totalPraise: { // total amount of praise. Used as currency to buy more followers
    type: Number,
    default: 0,
  },
  numCultists: {
    type: Number,
    default: 0,
  },
  numShog: {
    type: Number,
    default: 0,
  },
  numDeepOnes: {
    type: Number,
    default: 0,
  },
  numStarspawn: {
    type: Number,
    default: 0,
  },
  numElderThings: {
    type: Number,
    default: 0,
  },
  numBlessing1: {
    type: Number,
    default: 0,
  },
  numBlessing2: {
    type: Number,
    default: 0,
  },
  numBlessing3: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

ElderGodSchema.statics.toAPI = (doc) => ({
  name: doc.name,
});

ElderGodSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return ElderGodModel.find(search).select('name allEntities').exec(callback);
};

ElderGodSchema.statics.findById = (godId, callback) => {
  const search = {
    _id: godId,
  };
  return ElderGodModel.findOne(search).exec(callback);
};

ElderGodModel = mongoose.model('ElderGod', ElderGodSchema);

module.exports.ElderGodModel = ElderGodModel;
module.exports.ElderGodSchema = ElderGodSchema;

/* for use when making a new allEntities map
pps: { //praise per second, the amount of praise the player is earning per second
    type: Number,
    default: 0,
  },
  totalPraise: { //total amount of praise. Used as currency to buy more followers
    type: Number,
    default: 0,
  },
  numCultists: {
    type: Number,
    default: 0,
  },
  numShog: {
    type: Number,
    default: 0,
  },
  numDeepOnes: {
    type: Number,
    default: 0,
  },
  numStarspawn: {
    type: Number,
    default: 0,
  },
  numElderThings: {
    type: Number,
    default: 0,
  },
  numBlessing1: {
    type: Number,
    default: 0,
  },
  numBlessing2: {
    type: Number,
    default: 0,
  },
  numBlessing3: {
    type: Number,
    default: 0,
  },
*/
