var sha = require('should');
var request = require('supertest');
var app =require('../app.js');
var should = sha;
//var mongoose = require('mongoose');
//var utility = mongoose.model('Utlity');
var agent = request.agent(app);

describe('Utility CRUD process', function(){
    it('Should able save in DB for utility', function(done){

        var utlity = {'name': 'Suresh', 'mobile': '75541112', 'type': 'Electrical'};

        agent.post('/api/utility').send(utlity).expect(201)
             .end(function(error, result){
                
                 result.body.read.should.not.equal(false);                 
                 result.body.should.have.property('_id');
                 done();
             });

    });
});
