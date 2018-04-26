'use strict';

const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Bar = require('../models/bar');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('homepage');
});

/* POST search */

router.post('/search', (req, res, next) => {
  const searchedMusicType = req.body.musicType;
  Event.find({musicType: searchedMusicType}).populate('bar')
    .then((result) => {
      const data = {
        events: result
      };
      res.json(data);
    })
    .catch(next);
});

// router.post('/search', (req, res, next) => {
//   const searchedMusicType = req.body.musicType;
//   Event.find({musicType: searchedMusicType})
//     .then((result) => {
//       const data = {
//         searchedEvent: result
//       };
//       res.render('homepage', data);
//     })
//     .catch(next);
// });

/* Request maps */

router.get('/', (req, res, next) => {
  Bar.find({})
    .then((result) => {
      const data = {
        bars: result
      };
      res.render('pages/homepage', data);
    })
    .catch(next);
});

router.get('/bars/json', (req, res, next) => {
  Bar.find({})
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;

// 'use strict';

// const express = require('express');
// const router = express.Router();
// const Event = require('../models/event');

// /* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('homepage');
// });

// /* POST search */

// router.post('/search', (req, res, next) => {
//   const searchedMusicType = req.body.musicType;
//   Event.find({musicType: searchedMusicType})
//     .then((result) => {
//       const data = {
//         searchedEvent: result
//       };
//       res.render('homepage', data);
//     })
//     .catch(next);
// });

// module.exports = router;
