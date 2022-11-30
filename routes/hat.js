var express = require('express');
var hat_controller = require('../controllers/hat');
var router = express.Router();

// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 
router.get('/', hat_controller.hat_view_all_Page ); 
// GET request for one hat. 
router.get('/hat/:id', hat_controller.hat_detail);
/* GET detail hat page */ 
router.get('/detail', hat_controller.hat_view_one_Page); 
/* GET create hat page */ 
router.get('/create',secured, hat_controller.hat_create_Page); 
/* GET create update page */ 
router.get('/update',secured, hat_controller.hat_update_Page);
/* GET delete hat page */ 
router.get('/delete',secured, hat_controller.hat_delete_Page);
module.exports = router;