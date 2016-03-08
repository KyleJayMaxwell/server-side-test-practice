// assertion library kind of writing
var chai = require('chai');
// http requests testing a route and what comes back
var chaiHttp = require('chai-http');
// link to server
var server = require('../src/server/app');
// link to database
var knex = require('../db/knex');

// way of writing tests
var should = chai.should();
//use chai http to make requests instead
// test folder, in route, then run those
chai.use(chaiHttp);

describe('API routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done()
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    describe('Get all shows', function() {

        it('should get all shows', function(done) {
            chai.request(server)
            .get('/api/shows')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(4);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(false);
                done();
            });
        });

    });

    describe('Get one show', function() {

        it('should get one show', function(done) {
            chai.request(server)
            .get('/api/show/'+2)
            .end(function(err, res) {
                // console.log(res.body);
                // console.log(res.body[0].name);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(1);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Game of Thrones');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('HBO');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Fantasy');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(5);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(true);
                done();
            });
        });

    });

    // describe('Add a single show', function() {

    //     it('should add a single show', function(done) {
    //         chai.request(server)
    //         .post('/api/shows')
    //         .send({
    //             name: 'testing',
    //             channel: 'whatever',
    //             genre: 'great',
    //             rating: 1,
    //             explicit: false
    //         })
    //         .end(function(error, response){
    //             // test code
    //             chai.request(server)
    //             .get('/api/show/'+response.body[0])
    //             .end(function(err, res) {
    //                 res.should.have.status(200);
    //                 res.body.should.be.json;
    //                 res.body.should.have.property('name');
    //                 res.body.name.should.equal('testing');
    //                 done();  
    //             })
            
    //         });
    //     });

    // });

});

    // describe('Change a single show', function() {

    //     it('should change a single show', function(done) {
    //         chai.request(server)
    //         .send({
    //             name: 'testing',
    //             channel: 'whatever',
    //             genre: 'great',
    //             rating: 1,
    //             explicit: false
    //         })
    //         .put('/api/shows/1')
    //         .end(function(err, res){

    //             done();
    //         });
    //     });

    // });



