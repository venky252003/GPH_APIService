var should = require('should');
var sinon = require('sinon');

describe('Utlity Controller test case', function(){
    describe('Utlity Post Test', function(){
        var req = {
            body : {
                name: 'Venky',
                mobile: '8555422',
                type: 'Carpenter'
            }
        }

        var res = {
            status: sinon.spy(),
            send: sinon.spy()
            
        }

        var uitlityctl = require('../controller/utility.ctl')();
        uitlityctl.post(req, res);

        res.status.calledWith(201).should.equal(true);
        //res.send.calledWith('').should.equal(true);
    })
})