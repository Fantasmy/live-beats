'use strict';

const express = require('express');
const router = express.Router();

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

/* POST event */

module.exports = router;
