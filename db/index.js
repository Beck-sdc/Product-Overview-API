const { password } = require('./dbpassword.js');
const { Pool } = require('pg');

const dbConnection = new Pool({
  user: 'KaitlynMichael',
  password: `${password}`,
  database: 'productoverview',
  host: 'localhost',
  port: 5432,
});

// dbConnection.connect((error) => {
//   if (error) {
//     console.log('Connection error: ', error);
//   } else {
//     console.log('Connected to database!!');
//   }
// });

module.exports = dbConnection;