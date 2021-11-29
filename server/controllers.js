const db = require('../db');
const pgp = require('pg-promise')();

const controller = {

  getAll: async (req, res) => {
    const page = req.query.page || 1;
    const count = req.query.count || 5;

    const queryString = 'SELECT * FROM product ORDER BY product_id asc LIMIT $1 OFFSET $2';
    await db.query(queryString, [count, page - 1], (error, results) => {

      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).send(results.rows);
      }
    });
  },

  getOne: async (req, res) => {
    const productId = req.params.product_id;
    const queryString = `(SELECT *,
      (SELECT array_to_json(array_agg(row_to_json(Features)))  as features FROM
      (SELECT feature, value FROM features WHERE product_id = $1) features )
      FROM product WHERE product_id = $1)  `;
    await db.query(queryString, [productId], (error, results) => {
      if (error) {
        console.log(error)
        res.status(404).send(error);
      } else {
        res.status(200).send(results.rows[0]);
      }
    })

  },

  getProductStyles: async (req, res) => {
    const productId = req.params.product_id;
    const queryString = `
  SELECT product_id,
  (SELECT array_to_json(array_agg(row_to_json(Results)))  as results FROM
  (SELECT style_id, name, original_price, sale_price, default_style,
  (SELECT array_to_json(array_agg(row_to_json(Photos))) FROM
  (SELECT  thumbnail_url, url FROM photos WHERE photos.style_id = styles.style_id) Photos) photos,
  (SELECT json_object_agg(sku_id, json_build_object('quantity', quantity, 'size', size)) FROM
  (SELECT * FROM skus WHERE skus.style_id = styles.style_id) s) skus
  FROM styles WHERE product_id = $1) Results) FROM styles WHERE product_id = $1; `;
    await db.query(queryString, [productId], (error, results) => {
      if (error) {

        res.status(404).send(error);
      } else {
        res.status(200).send(results.rows);
      }
    })
  },

  addToCart: async (req, res) => {
    const sku = req.body.sku_id
    const quantity = req.body.quantity
    const user_session = req.body.user_session
    const active = req.body.active
    const product_id = req.body.product_id

    await db.query(`SELECT pg_catalog.setval(pg_get_serial_sequence('cart', 'cart_id'), MAX(cart_id)) FROM cart;`)
    await db.query(`INSERT INTO cart (user_session, product_id, active, sku_id, quantity) VALUES ($1, $2, $3, $4
      , $5);`, [user_session, product_id, active, sku, quantity], (error, results) => {
      if (error) {
        console.log(error)
        res.status(404).send(error);
      } else {
        res.status(201).send(results.rows);
      }
    })
  },

  getCart: (req, res) => {
    const queryString = `SELECT  * FROM cart;`
    db.query(queryString, (error, results) => {
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(200).send(results.rows);
      }
    })
  }
};


module.exports = controller;