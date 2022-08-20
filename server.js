const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv/config');

const app = express();

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
      done(null, profile);
    }
  )
);

app.engine(
  'hbs',
  hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })
);
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

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
