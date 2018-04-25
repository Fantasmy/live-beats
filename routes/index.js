'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/event');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('homepage');
});

/* POST search */

router.post('/search', (req, res, next) => {
  const searchedMusicType = req.body.musicType;
  Event.find({musicType: searchedMusicType})
    .then((result) => {
      const data = {
        searchedEvent: result
      };
      res.render('homepage', {
        searchList: data });
    })
    .catch(next);
});

module.exports = router;
