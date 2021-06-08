const mongoose = require('mongoose');
var Post = mongoose.models.Post;
const server=require("../index.js");
var assert = require("assert");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);


describe ("Post CRUD OPERATIONS", function(){

    before(() => Post.deleteMany({})); //clear test database

    const ID = mongoose.Types.ObjectId();
    const taskId = "70bd7270066eee4178e4405e";

    it ("Post a new post", (done)=>{
        const post = {author : "RokaiaGhareeb", title: "Hi There", post : "This is a new post for testing", _id: ID};
        chai.request(server)
        .post("/api/post/")
        .send(post)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });

    it ("Post a new post with missing attributes", (done)=>{
        const post = {title: "Hi There", post : "This is a new post for testing"};
        chai.request(server)
        .post("/api/post/")
        .send(post)
        .end((err, result)=>{
            result.should.have.status(400);
            done();
        });
    });


    it ("Should Fetch all the Posts", (done)=>{
            chai.request(server)
            .get("/api/post/")
            .end((err, result)=>{
                result.should.have.status(200);
                result.body.Posts.should.be.a('array');
                done();
        });
    });

    it ("Should Fetch specific post", (done)=>{
        chai.request(server)
        .get("/api/post/" + ID)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });

    it ("ID doesn't exist to fetch", (done)=>{
        chai.request(server)
        .get("/api/post/" + taskId)
        .end((err, result)=>{
            result.should.have.status(404);
            done();
        });
    });
    
    it("Update post", (done)=>{
        const updatedPost = {title : "updated"};
        chai.request(server)
        .patch("/api/post/" + ID)
        .send(updatedPost)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });    

    it ("Delete Post", (done)=>{
        chai.request(server)
        .delete("/api/post/" + ID)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });    

    it ("Delete Post doesn't exist", (done)=>{
        chai.request(server)
        .delete("/api/post/" + ID)
        .end((err, result)=>{
            result.should.have.status(404);
            done();
        });
    });    

    it("Update post doesn't exist", (done)=>{
        const updatedPost = {title : "updated"};
        chai.request(server)
        .patch("/api/post/" + ID)
        .send(updatedPost)
        .end((err, result)=>{
            result.should.have.status(404);
            done();
        });
    });    
});