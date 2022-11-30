var express = require('express');
var router = express.Router();
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



router.get('/hat', hat_controller.hat_list);

module.exports = router;