var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../index.js");
let should = chai.should();
chai.use(chaiHttp);

describe ("CRUD OPERATIONS", function(){
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
        const taskId = "60bd7270066eee4178e4405e";
        chai.request(server)
        .get("/api/post/" + taskId)
        .end((err, result)=>{
            result.should.have.status(200);
            done();
        });
    });

    it ("ID doesn't exist to fetch", (done)=>{
        const taskId = "70bd7270066eee4178e4405e";
        chai.request(server)
        .get("/api/post/" + taskId)
        .end((err, result)=>{
            result.should.have.status(404);
            done();
        });
    });

    //post

    //delete

    //update
});