//connect to mongodb

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://rokaia-admin:${process.env.password}@cluster0.i8bmm.mongodb.net/360Blog?retryWrites=true&w=majority`, { useFindAndModify: false }, (err)=>{
    if(err){
      console.error(err);
      process.exit(1);
    }
    console.info('db-connection successfully');
});