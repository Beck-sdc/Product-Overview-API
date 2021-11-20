const db = require('../db');

const controller = {

  getAll: (req, res) => {
    const queryString = 'SELECT * FROM product';
    db.query(queryString, (error, results) => {
      if (error) {
        console.log('Oh no! We could\'t get your products!');
        res.status(404).send(error);
      } else {
        console.log('YAY your products have been retrieved!');
        res.status(201).send(results);
      }
    });
  },



};


module.exports = controller;