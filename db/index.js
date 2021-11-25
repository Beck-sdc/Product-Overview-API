const { password } = require('./dbpassword.js');
const { Pool } = require('pg');

const dbConnection = new Pool({
  user: 'KaitlynMichael',
  password: `${password}`,
  database: 'productoverview',
  host: 'localhost',
  port: 5432,
});


module.exports = dbConnection;