var express = require('express'); 
var router = express.Router(); 

// Require controller modules. 
var api_controller = require('../controllers/api'); 
var hat_controller = require('../controllers/hat'); 

/// API ROUTE /// 

// GET resources base. 
router.get('/', api_controller.api); 

/// hat ROUTES /// 

// POST request for creating a hat.  
router.post('/hat', hat_controller.hat_create_post); 

// DELETE request to delete hat. 
router.delete('/hat/:id', hat_controller.hat_delete); 

// PUT request to update hat. 
router.put('/hat/:id', hat_controller.hat_update_put); 

// GET request for one hat. 
router.get('/hat/:id', hat_controller.hat_detail); 

// GET request for list of all hat items. 
router.get('/hat', hat_controller.hat_list); 

// GET detail hat page */ 
router.get('/detail', hat_controller.hat_view_one_Page); 

/* GET create hat page */ 
router.get('/create', hat_controller.hat_create_Page); 

/* GET create update page */ 
router.get('/update', hat_controller.hat_update_Page); 

/* GET delete hat page */ 
router.get('/delete', hat_controller.hat_delete_Page); 
 

module.exports = router; 

