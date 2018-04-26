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
<<<<<<< HEAD
  const searchedMusicType = req.body.musicType;
  Event.find({musicType: searchedMusicType})
    .populate('bar') // populate the bar: ObjectID with actual data
    .then((result) => {
      const data = {
        events: result
      };
      res.json(data);
=======
  const searchedMusicType = req.body.musicType; // gets musicType key from the body (from main.js)
  Event.find({musicType: searchedMusicType}) // musicType from model of events
    .populate('bar') // populate the bar: ObjectID with actual data, same bar as in the model of event
    .then((result) => { // receives result, array of the rock event (and inside the populated info of bar)
      const data = {
        events: result
      };
      res.json(data); // converts data into string to send to main.js (front-end) => to response
>>>>>>> cc26591e8bdc693174ad334a8e5ac4b1b9660cda
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
