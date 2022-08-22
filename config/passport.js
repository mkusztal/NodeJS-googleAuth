const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv/config');

const googleClientId = process.env.CLIENT_ID_GOOGLE;
const googleSecretClient = process.env.CLIENT_SECRET_ID_GOOGLE;
const callbackURL = 'http://localhost:8000/auth/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleSecretClient,
      callbackURL: callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);
// code(JS) => JSON
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// JSON => code(JS)
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});
