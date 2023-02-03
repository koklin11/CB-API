var express = require("express");
require("dotenv").config();
var router = express.Router();
const mysql = require("mysql2");
// Import middlewares
const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/roles");
// create the connection to database


var connection;

function handleDisconnect() {
  connection = mysql.createConnection({host: process.env.DBhost,
    port: process.env.DBport,
    user: process.env.DBuser,
    password: process.env.DBpassword,
    database: process.env.DBdatabase,}); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


//Routes will go here
module.exports = router;
router.get("/", [auth, admin], (req, res) => {
  // simple query
  connection.query(
    "SELECT * FROM `cbdatamail`",
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


  
});
router.get("/:itemCode", [auth, admin], (req, res) => {
  // simple query
  connection.query(
    "SELECT Ver,Design,itemGroup,Description,ReportID,"+
    "CONNbrWire,CONDiamWire,CONDiamNOM,CONWeightMAX,MicaWeightMAX,"+
    "INSThickAVG,INSThickMIN,INSWeightMAX,TwistMax,BEDThickNOM,"+
    "BEDThickMIN,BEDWeightMAX,SEPThickNOM,SHThickNOM,SHThickAVG,"+
    "SHThickMIN,SHWeightMAX,INSDiam,SHDiam,ARMDiamNOM,ARMDiamNBR,"+
    "ARMWeightMAX,LayUpNom,INTResistance,conductorResistance,"+
    "UpdateDateTime,type,Construction,Standard,INSMaterial,BEDMaterial,"+
    "SEPMaterial,SHMaterial,Conductor,ConductorResistanceMax from cbdatamail WHERE Design ='"+req.params.itemCode+"'",
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


  
});