const mongoose = require('mongoose');
const server=require("../index.js");
var assert = require("assert");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);


describe ("Comment CRUD OPERATIONS", function(){

    const postId = mongoose.Types.ObjectId();
    const commentId = mongoose.Types.ObjectId();
    const taskId = "70bd7270066eee4178e4405e";

    it ('',(done)=>{
        const post = {author : "RokaiaGhareeb", title: "Hi There", post : "This is a new post for testing", _id: postId};
        chai.request(server)
        .post("/api/post/")
        .send(post)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });

    it ("Add new comment",(done)=>{
        const comment = {commenter: "R.E", comment: "this test comment", _id : commentId};
        chai.request(server)
        .post("/api/comment/"+ postId)
        .send(comment)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });

    it ("Add new comment to a deleted post", (done)=>{
        const comment = {commenter: "R.E", comment: "this test comment"};
        chai.request(server)
        .post("/api/comment/" + taskId)
        .send(comment)
        .end((err, result)=>{
            result.should.have.status(404);
            done();
        });
    });

    it ("Should Fetch all the comments of a post", (done)=>{
            chai.request(server)
            .get("/api/comment/" + postId)
            .end((err, result)=>{
                result.should.have.status(200);
                result.body.Comments.should.be.a('array');
                done();
        });
    });
   
    it("Update comment", (done)=>{
        const updatedComment = {comment : "updated"};
        chai.request(server)
        .patch(`/api/comment/${postId}/${commentId}/`)
        .send(updatedComment)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });    

    it ("Delete comment", (done)=>{
        chai.request(server)
        .delete("/api/comment/"+ postId + "/" + commentId)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });    

    it ("Delete comment on deleted post", (done)=>{
        chai.request(server)
        .delete("/api/comment/" + taskId + '/' + commentId + '/')
        .end((err, result)=>{
            result.should.have.status(404);
            done();
        });
    });    

    it("Update comment doesn't exist", (done)=>{
        const updatedComment = {comment : "updated"};
        chai.request(server)
        .patch("/api/comment/" + taskId + '/' + commentId + '/')
        .send(updatedComment)
        .end((err, result)=>{
            result.should.have.status(404);
            done();
        });
    });    
});