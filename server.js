var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Require the Router we defined in movies.js
// Import routes
const authRouter = require("./routes/auth");
var CBAPI = require('./routes/CBAPI.js');

//Use the Router on the sub route /movies
app.use("/api/auth", authRouter);
app.use('/CBAPI', CBAPI);

app.listen(3000);