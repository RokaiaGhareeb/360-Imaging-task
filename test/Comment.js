var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../index.js");
let should = chai.should();
chai.use(chaiHttp);

describe ("CRUD OPERATIONS", function(){
    it ("Should Fetch all the Comments for a post", (done)=>{
            const taskId = "60bd7270066eee4178e4405e";
            chai.request(server)
            .get("/api/comment/"+ taskId)
            .end((err, result)=>{
                result.should.have.status(200);
                result.body.Comments.should.be.a('array');
                done();
        });
    });

   


    //post

    //delete

    //update
});