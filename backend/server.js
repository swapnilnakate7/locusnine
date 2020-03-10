const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const api = require('./router/api')
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api)


module.exports =app;