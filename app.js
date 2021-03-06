/** Required External Modules **/
require('dotenv').config();
const express = require("express");
var cors = require('cors');
require('./db-connection');
const PostRouter = require('./Routers/Post');
const CommentRouter = require('./Routers/Comment');
/** App Variables **/
const app = express();
const port = process.env.PORT || "3000";

/** App Configuration **/
app.use(cors());
app.use(express.json())

/** Routes Definitions **/
app.use('/api/post', PostRouter.Router);
app.use('/api/comment', CommentRouter);

app.use((req, res, next) => { //logger
    console.log(`Request Url : ${req.url}, Request method : ${req.method}, Date of Request: ${Date()}`);
    next();
});

app.use( (req, res, next) =>  { //error handler
    res.status(500);
    res.send({error : "server error"});
});



/** Server Activation **/

var server = app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = server;