const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv/config');

const app = express();

const googleClientId = process.env.CLIENT_ID_GOOGLE;
const googleSecretClient = process.env.CLIENT_SECRET_ID_GOOGLE;
const callbackURL = 'http://localhost:8000/auth/callback';
const secret_auth = process.env.SECRET_COOKIES;

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleSecretClient,
      callbackURL: callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
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

app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(
  session({ resave: false, saveUninitialized: true, secret: secret_auth })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index');
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
  '/auth/callback',
  passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/user/logged');
  }
);

app.get('/user/logged', (req, res) => {
  res.render('logged');
});

app.get('/user/no-permission', (req, res) => {
  res.render('noPermission');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
