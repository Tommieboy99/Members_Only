require('dotenv').config();
const express = require("express");
const session = require('express-session');
const pgStore = require('connect-pg-simple')(session);
const passport = require('passport');
const path = require('node:path');
const routes = require('./routes');
const db = require('./config/database');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new pgStore({
      pool: db,
      tableName: 'user_sessions',
      createTableIfMissing: true,
      pruneSessionInterval: 60,
    }),
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
      maxAge: 1000 * 60 * 60,
    }
}));

require('./config/passport');
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(process.env.PORT || 3000, (error) => {
    if (error) {
        throw error;
    }
    console.log("app listening on port 3000!");
})