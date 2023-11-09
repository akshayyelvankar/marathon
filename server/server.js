// server.js

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const StravaStrategy = require('passport-strava-oauth2').Strategy;

const app = express();
const port = process.env.PORT || 3000;

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new StravaStrategy(
    {
      clientID: '116117',
      clientSecret:' 7f89a27c089e141e58680835f46530d5ae34b0d6',
      callbackURL: 'http://localhost:3000/auth/strava/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle user data and authentication here
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Strava Integration Example');
});

app.get('/auth/strava', passport.authenticate('strava'));

app.get('/auth/strava/callback', passport.authenticate('strava', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
