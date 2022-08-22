const express = require('express');
const router = express.Router();

router.get('/logged', (req, res) => {
  res.render('logged');
});

// router.get('/profile', (req, res) => {
//   if (req.user) {
//     res.render('profile');
//   } else {
//     res.redirect('noPermission');
//   }
// });

// router.get('/profile/settings', (req, res) => {
//   if (req.user) {
//     res.render('settings');
//   } else {
//     res.redirect('noPermission');
//   }
// });

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

module.exports = router;
