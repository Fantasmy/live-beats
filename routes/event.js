'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Event = require('../models/event');

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/auth/login');
  }
});

// ################################# GET-POST #################################//

/* GET create event page. */
router.get('/create', function (req, res, next) {
  res.render('pages/create-event');
});

/* POST create event in a database */
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
          res.redirect(`event-details/${event._id}`);
        })
        .catch(next);
    });
});

/* GET event details */
router.get('/event-details/:eventId', (req, res, next) => {
  // validate mongo ID and send 404 if invalid
  if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  // else
  Event.findOne({ _id: req.params.eventId })
    .then((result) => {
      const data = {
        event: result
      };
      res.render('pages/event-details', data);
    })
    .catch(next);
});

/* GET events page */

router.get('/list', (req, res, next) => {
  Event.find({})
    .then((result) => {
      const data = {
        events: result
      };
      res.render('pages/events', data);
    });
});

module.exports = router;
