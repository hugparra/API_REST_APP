const express = require('express');
const bodyParser = require('body-parser');
const conect =require('./conectionBD');
const router =require('./routes/index');
const validator = require('express-validator');

const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(validator());
app.use('/API_TRANSMI/V0/',router);


var port = process.env.PORT || 3000;

app.listen(port,function (){
  console.log("server run");
});
