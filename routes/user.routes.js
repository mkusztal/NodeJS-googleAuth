const express = require('express');
const router = express.Router();
require('passport');

router.get('/logged', (req, res) => {
  if (req.user) {
    res.render('logged', {
      name: req.user.displayName,
      avatar: req.user.photos[0].value,
    });
  } else {
    res.redirect('/user/no-permission');
  }
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', (req, res) => {
  if (req.user) {
    res.render('profile');
  } else {
    res.redirect('/user/no-permission');
  }
});

router.get('/profile/settings', (req, res) => {
  if (req.user) {
    res.render('settings');
  } else {
    res.redirect('/user/no-permission');
  }
});

router.get('/logout', (req, res) => {
  res.render('index');
  console.log('Logout');
});

module.exports = router;
