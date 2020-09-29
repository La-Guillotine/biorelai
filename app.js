const express = require('express');
const mysql = require('mysql');
const app = express();
//router
const router = express.Router();
const user_route = require('./api-routes/user');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));

// Home page route.
app.get('/', function (req, res) {
  res.send('Wiki home page');
});
app.use('/users', user_route);

app.listen(82);