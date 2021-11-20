const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const db = require('../db');
const router = require('./routes');
const port = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/', router);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});