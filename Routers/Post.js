const express = require('express');

const mongoose = require('mongoose');

const Posts = require('../models/Posts.js');

const PostRouter = express.Router();


module.exports = PostRouter;


//Post new post
PostRouter.post('/', async (req, res) => {
    const {author, title, post, _id} = req.body;
    try {
        let newPost;
        if(process.env.NODE_ENV ==='test'){
            newPost = await Posts.create({author, title, post, comments : [], _id});
        }else{
            newPost = await Posts.create({author, title, post, comments : []});
        }
        console.log(newPost);
        res.statusCode = 200;
        res.send({"message" : "Posted successfully"});
    } catch (err) {
        res.statusCode = 400;
        res.send({ "message" : "Something wrong, retry again!"});
    }
});

//Get a list of all posts
PostRouter.get('/', async (req, res) => {
   try{
       const posts = await Posts.find({}).exec();
       res.statusCode = 200;
       res.send({"Posts" : posts});
   }catch(err){
        res.statusCode = 422;
        res.send({ "message" : "Something wrong, retry again!"});
   }
});

//Get specific post providing its id
PostRouter.get('/:id', async (req, res) => {
    try{
        const post = await Posts.findOne({_id : req.params.id}).exec();
        if(post != null){
            res.statusCode = 200;
            res.send({"Post" : post});
        }else{
            res.statusCode = 404;
            res.send({"message" : "Post not found!"});
        }
    }catch(err){
         res.statusCode = 422;
         res.send({ "message" : "Something wrong, retry again!"});
    }
 });
 
//Update a specific post providing its id
PostRouter.patch('/:id', async (req, res) => {
    let {title, post} = req.body;
    try{
        const updatedPost = await Posts.findOne({_id : req.params.id});
        if(updatedPost != null){
            await Posts.updateOne({_id : req.params.id}, {title : title ?? updatedPost.title, post : post ?? updatedPost.post});
            res.statusCode = 200;
            res.send({"message":"Post updated"});
        }else{
            res.statusCode = 404;
            res.send({"message":"Post not found!"});
        }
    }catch(err){
         res.statusCode = 422;
         res.send({ "message" : "Something wrong, retry again!"});
        }
 });
 
//Delete a specific Post providing its id
PostRouter.delete('/:id', async (req, res) => {
    try{
        const post = await Posts.findOne({_id : req.params.id});
        if(post != null){
            await Posts.deleteOne({_id : req.params.id});
            res.statusCode = 200;
            res.send({"message":"Post deleted"});
        }else{
            res.statusCode = 404;
            res.send({"message":"Post not found!"});
        }
    }catch(err){
         res.statusCode = 422;
         res.send({ "message" : "Something wrong, retry again!"});
        }
 });