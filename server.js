const router = require('./app/routes/routes');
const express = require('express');
const app = express();
// Get the db config from our JSON files
let config = require('config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect(config.DBHost);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use('/api', router);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});

module.exports = app;
