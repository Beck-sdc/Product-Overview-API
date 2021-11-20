const router = require('express').Router();
const controller = require('./controllers.js');

router.get('/', controller.getAll);




module.exports = router;