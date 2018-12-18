const assert = require('assert');
const request = require('supertest');
const mongoose = ('mongoose');
const server = require('../../index')
var Artist = require('../../models/Artist')
// const testHelper = require('../test_helper')

// testHelper.resetTestDB();

describe("Artist Controller Tests", () => {
    it("Controller creates Artist", (done) => {
        request(server)
            .post('/api/users/')
            .send({
                username: "Test2",
                password: "test222",
                fullname: "Test van der test",
                address: "Teststreet 93",
                postalcode: "3123DE",
                city: "TestCity",
                country: "Testland"
            })
            .expect(201)
            .then((result) => {
                request(server)
                    .post('/api/login')
                    .expect(200)
                    .send({username: "Test2", password: "test222"})
                    .then((login) => {
                        request(server)
                            .post("/api/artists")
                            .set('x-access-token', login.body.token)
                            .expect(201)
                            .send({ name: "Simply Red", description: "If you don't know me by now, you will never ever know me.", genre: "Jazz, Pop", img: "https://sublime.nl/wp-content/uploads/2016/11/b6ce039648d6d381fbd4321aa338bf17.jpg" })
                            .end(() => {
                                Artist.findOne({ "name": "Simply Red" })
                                    .then(artist => {
                                        assert(artist.name === "Simply Red")
                                        assert(artist.genre === "Jazz, Pop")
                                        done();
                                    })
                            })
                    })
            });
    })

    it('Put to /api/artists edits an Artist', done => {
        request(server)
            .post('/api/login')
            .expect(200)
            .send({username: "Test2", password: "test222"})
            .then((login) => {  
                Artist.findOne({ "name": "Simply Red" })
                    .then(artist => {
                        request(server)
                            .put('/api/artists')
                            .set('x-access-token', login.body.token)
                            .expect(200)
                            .send({id: artist._id, genre: "Jazz, Pop, Rock" })
                            .end(() => {
                                Artist.findOne({ "_id": artist._id })
                                    .then(artist => {
                                        assert(artist.genre === "Jazz, Pop, Rock")
                                        done();
                                    })
                            })
                    })
                })
    });

    it('Get to /api/artists/:id can get artist', done => {
        Artist.findOne({ "name": "Simply Red" })
            .then(artist => {
                request(server)
                    .get('/api/artists?id='+artist._id)
                    .expect(200)
                    .send()
                    .then((result) => {
                        assert(result.body.name === "Simply Red")
                        assert(result.body.genre === "Jazz, Pop, Rock")
                        done()
                    })
        })
    })
    it('Get to /api/artists can get artists', done => {
        request(server)
            .get('/api/artists')
            .expect(200)
            .send()
            .then((result) => {
                assert.notEqual(result.body.count, 0);
                done()
            })
    })

    it('Delete to /api/artists?id= can delete artist', done => {
        request(server)
            .post('/api/login')
            .expect(200)
            .send({username: "Test2", password: "test222"})
            .then((login) => { 
                Artist.findOne({ "name": "Simply Red" })
                    .then(artist => { 
                        request(server)
                            .delete('/api/artists?id='+ artist._id)
                            .set('x-access-token', login.body.token)
                            .expect(200)
                            .send()
                            .end(() => {
                                Artist.findOne({ name: "Simply Red" })
                                    .then((art) => {
                                        assert(art == null)
                                        done();
                                    })
                            })
                    })
            })
    })
})
