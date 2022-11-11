var express = require('express');

var router = express.Router();



const hat_controllers = require('../controllers/hat');

/* GET home page. */

router.get('/',hat_controllers.hat_view_all_Page);

module.exports = router;