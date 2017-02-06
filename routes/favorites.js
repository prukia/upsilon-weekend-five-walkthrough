var router = require('express').Router();

//link database
var pg = require("pg");

var pool = new pg.Pool({
  database: 'gifs'
});

router.get('/', function (req,res){
  // ask the database for all the favorites
  // send them to the client
  pool.connect(function (err, client, done){
    //alternative to done function in every step
    try {



      if (err) {
        console.log('Error connecting to the DB', err);
        // if deploying might not wanna send info to the client
        res.status(500).send(err);
      } else {

        client.query("SELECT * FROM favorites;", function (err, results){
          if(err){
            console.log("Error getting favorites", err);
            res.status(500).send(err);
          }else{
            res.send(results.rows);
          }
        });
      }
    } finally {
      done();
    }

  });
});
router.post('/', function (req,res){
  // get the info from the request body
  // put it in the database// respond to the client
  pool.connect(function (err, client, done){
    //alternative to done function in every step
    try {



      if (err) {
        console.log('Error connecting to the DB', err);
        // if deploying might not wanna send info to the client
        res.status(500).send(err);
      } else {

        client.query("INSERT INTO favorites (url, comment) VALUES ($1, $2) RETURNING *;",
        [req.body.url, req.body.comment],
         function (err, results){
          if(err){
            console.log("Error creating favorites", err);
            res.status(500).send(err);
          }else{
            res.send(results.rows);
          }
        });
      }
    } finally {
      done();
    }

  });
});






module.export = router;
