var express = require("express");
var router = express.Router();
const mysql = require("mysql2");
// Import middlewares
const auth = require("./middleware/auth");
const { admin, editor, viewer } = require("./middleware/roles");
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cbmail",
});

//Routes will go here
module.exports = router;
router.get("/", [auth, admin], (req, res) => {
  // simple query
  connection.query(
    "SELECT * FROM `attributename`",
    function (err, results, fields) {
      const row = [];

      Object.keys(results).forEach(function (key) {
        row.push(results[key]);
        console.log(row.fullName);
        console.log(key);
      });

      return res.json(row);
      //console.log(results); // results contains rows returned by server
      //console.log(fields); // fields contains extra meta data about results, if available
    }
  );

  //res.json(movies);
});
