const express = require('express');
const mysql = require('mysql');
const app = express();

const user_route = require('./api-routes/user');
const categorie_route = require('./api-routes/categorie');
const producer_route = require('./api-routes/producers');

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
app.use('/categorie', categorie_route);
app.use('/producers', producer_route);

app.listen(82);