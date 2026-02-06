const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

// Profile
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.redirect('/login');
  res.send(`Bienvenue, ${req.user.displayName}!`);
});

module.exports = router;
