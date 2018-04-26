'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/event');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('homepage');
});

/* POST search  - goes to database and find event of searchedMusicType */
router.post('/search', (req, res, next) => {
  const searchedMusicType = req.body.musicType;
  Event.find({musicType: searchedMusicType})
    .populate('bar') // populate the bar: ObjectID with actual data
    .then((result) => {
      const hello = {
        events: result
      };
      res.json(hello);
    })
    .catch(next);
});

module.exports = router;

// to get all bars from db
/* const Bar = require('../models/bar');
router.get('/bars/json', (req, res, next) => {
  Bar.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});
 */
