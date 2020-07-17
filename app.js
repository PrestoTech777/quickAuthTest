const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

const User = require('./user');
const routes = require('./router');
const MONGO = require('./.mongo');

const app = express();
const PORT = 3000;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "Presto Soft Inc",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', routes);

app.listen(PORT, () => { console.log(`Server is listening on port: ${PORT}`) });
