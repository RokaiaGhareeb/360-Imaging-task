const express = require('express');

const mongoose = require('mongoose');

const Posts = require('../models/Posts');

const CommentRouter = express.Router();


module.exports = CommentRouter;


//Post a new comment
CommentRouter.post('/:postId', async (req, res) => {
    const {commenter, comment} = req.body;
    const newComment = { commenter, comment};
    try {
        const post = await Posts.findOne({_id: req.params.postId}).exec();
        if(post != null){
            await Posts.updateOne({_id: req.params.postId}, {$push : {comments: newComment}});
            res.statusCode = 200;
            res.send({"message" : "Comment added"});
        }else{
            res.statusCode = 404;
            res.send({"message" : "Post not found!"});
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message" : "Something wrong, retry again!"});
    }
});

//Get a list of all comments on a post
CommentRouter.get('/:postId', async (req, res) => {
   try{
       const post = await Posts.findOne({_id: req.params.postId}).exec();
       if(post != null){
           res.statusCode = 200;
           res.send({"Comments" : post.comments});
       }else{
        res.statusCode = 404;
        res.send({"message" : "Post not found!"});
    }
   }catch(err){
        res.statusCode = 422;
        res.send({ "message" : "Something wrong, retry again!"});
   }
});


//Update a specific comment on a post providing its id and post id
CommentRouter.patch('/:postId/:commentId', async (req, res) => {
    const {comment} = req.body;
    try{
        const updatedComment = await Posts.findOne(
            {_id: req.params.postId, "comments._id" : req.params.commentId},
            {comments: {$slice: 1}}
        ).exec();
        if(updatedComment != null){
            await Posts.updateOne(
                { _id: req.params.postId, "comments._id": req.params.commentId },
                {
                    $set: {
                        "comments.$.comment": comment,
                    }
                }
                );
                res.statusCode = 200;
                res.send({"message":"Comment updated"});
            }else{
                res.statusCode = 404;
                res.send({"message" : "Comment not found!"});
            }
            }catch(err){
         res.statusCode = 422;
         res.send({ "message" : "Something wrong, retry again!"});
        }
 });
 
//Delete a comment on a post providing its id and post id
CommentRouter.delete('/:postId/:commentId', async (req, res) => {
    try {
        const deletedComment = await Posts.findOne(
            {_id: req.params.postId, "comments._id" : req.params.commentId},
            {comments: {$slice: 1}}
        ).exec();
        if(deletedComment != null){
            await Posts.updateOne(
                {_id: req.params.postId}, 
                {$pull : {comments: {_id : req.params.commentId}}}
                );
                res.statusCode = 200;
                res.send({"message" : "Comment deleted"});
        }else{
            res.statusCode = 404;
            res.send({"message" : "Comment not found!"});
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message" : "Something wrong, retry again!"});
    }
 });