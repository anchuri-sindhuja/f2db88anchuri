var hat = require('../models/hat'); 

// List of all hats 
exports.hat_list = async function(req, res) { 
    try{ 
        thehats = await hat.find(); 
        res.send(thehats); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// for a specific hat. 

exports.hat_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await hat.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };



// Handle hat delete form on DELETE. 
exports.hat_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: hat delete DELETE ' + req.params.id); 
}; 

// Handle hat update form on PUT. 

exports.hat_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await hat.findById( req.params.id)
 // Do updates of properties
 if(req.body.hat_color)
 toUpdate.hat_color = req.body.hat_color;
 if(req.body.hat_type) toUpdate.hat_type = req.body.hat_type;
 if(req.body.hat_size) toUpdate.hat_size = req.body.hat_size;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
}; 
// VIEWS 
// Handle a show all view 
exports.hat_view_all_Page = async function(req, res) { 
    try{ 
        thehats = await hat.find(); 
        res.render('hat', { title: 'hat Search Results', results: thehats }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

exports.hat_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new hat(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    document.hat_color = req.body.hat_color; 
    document.hat_color = req.body.hat_color; 
    document.hat_hat_size = req.body.hat_hat_size; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
};