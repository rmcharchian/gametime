var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req, res) {
    console.log('in the events route');

    pool.connect( function(err, client, done) {
        if (err) {
            console.log('Pool Connection Error');
            done();
            res.sendStatus(500);
        }//END if err
        else{
            client.query("SELECT * FROM events", function (quErr, resObj){
                done();
                if(quErr){
                    console.log('query error', quErr);
                    res.sendStatus(500); 
                }//END if quErr
                else{
                    res.send(resObj.rows);
                }//END else
            });//END client.query
         }//END else no err
    })//END pool connect
});

module.exports = router;