'use strict';

const express = require('express');
const router = express.Router();

const Event = require('../models/event');

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/auth/login');
  }
});

/* GET create event page. */
router.get('/create', function (req, res, next) {
  res.render('pages/create-event');
});

/* POST / SAVE event */

router.post('/create', (req, res, next) => {
  const title = req.body.title;
  const musicType = req.body.musicType;
  const description = req.body.description;

  if (title === '' || musicType === '') {
    res.render('pages/create-event', {
      errorMessage: 'You are missing stuff'
    });
    return;
  }

  Event.findOne({ title: title })
    .then(result => {
      if (result) {
        res.render('pages/create-event', {
          errorMessage: 'Sorry, the name of the event already exist'
        });
        return;
      }

      const event = new Event({
        title,
        musicType,
        description
      });

      event.save()
        .then(() => {
          res.render('pages/event-details');
        })
        .catch(next);
    });
});

module.exports = router;
