//connect to mongodb

const mongoose = require('mongoose');
require('dotenv').config();


let dbURI;

if (process.env.NODE_ENV ==='test'){
  dbURI = process.env.DBTest
}
if (process.env.NODE_ENV ==='production'){
  dbURI = process.env.DBHost
}

console.log(process.env.NODE_ENV);

mongoose.connect(dbURI , { useFindAndModify: false }, (err)=>{
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info('db-connection successfully');
});