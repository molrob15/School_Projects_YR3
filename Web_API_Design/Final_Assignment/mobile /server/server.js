const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/retroGameDb');
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(cors());


// initialize routes
app.use('/api', require('../routes/api'));

app.listen(3001, () => console.log("listening on port 3001"));