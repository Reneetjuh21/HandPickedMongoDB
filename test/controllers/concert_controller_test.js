const assert = require('assert');
const request = require('supertest');
const mongoose = ('mongoose');
const server = require('../../index')
const Artist = require('../../models/Artist')
const Concert = require('../../models/Concert')
// const testHelper = require('../test_helper')

// testHelper.resetTestDB();

describe("Concert Controller Tests", () => {
    it("Controller creates Concert", (done) => {
        request(server)
            .post('/api/users/')
            .send({
                username: "Test3",
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
                    .send({username: "Test3", password: "test222"})
                    .then((login) => {
                        request(server)
                            .post("/api/artists")
                            .set('x-access-token', login.body.token)
                            .expect(201)
                            .send({ name: "Simply Red", description: "If you don't know me by now, you will never ever know me.", genre: "Jazz, Pop", img: "https://sublime.nl/wp-content/uploads/2016/11/b6ce039648d6d381fbd4321aa338bf17.jpg" })
                            .then((artist) => {
                                request(server)
                                    .post("/api/concerts")
                                    .set('x-access-token', login.body.token)
                                    .expect(201)
                                    .send({ artist: artist.body.artist._id, date: "12-12-2018", ticketPrice: 40, capacity: 5000 })
                                    .then((concert) => {
                                        Concert.findOne({"_id": concert.body.concert._id})
                                            .then(concert => {
                                                assert(concert.capacity === 5000)
                                                assert(concert.ticketPrice === 40)
                                                done();
                                            })
                                    })
                            })
                    })
            })
    })

    it('Put to /api/concerts edits a Concert', done => {
        request(server)
            .post('/api/login')
            .expect(200)
            .send({username: "Test3", password: "test222"})
            .then((login) => {  
                Artist.findOne({ "name": "Simply Red" })
                    .then(artist => {
                        Concert.findOne({ "artist": artist._id })
                            .then(concert => {
                                request(server)
                                    .put('/api/concerts')
                                    .set('x-access-token', login.body.token)
                                    .expect(200)
                                    .send({id: concert._id, ticketPrice: 50 })
                                    .end(() => {
                                        Concert.findOne({ "_id": concert._id })
                                            .then(concert => {
                                                assert(concert.ticketPrice === 50)
                                                done();
                                            })
                                    })
                                
                            })
                    })
            })
    })

    it('Get to /api/concerts/:id can get concert', done => {
        Artist.findOne({ "name": "Simply Red" })
            .then(artist => {
                Concert.findOne({ "artist": artist._id })
                    .then(concert => {
                        request(server)
                            .get('/api/concerts?id='+concert._id)
                            .expect(200)
                            .send()
                            .then((result) => {
                                assert(result.body.ticketPrice === 50)
                                assert(result.body.capacity === 5000)
                                done()
                            })
                    })
            })
    })
    it('Get to /api/concerts can get concerts', done => {
        request(server)
            .get('/api/concerts')
            .expect(200)
            .send()
            .then((result) => {
                assert.notEqual(result.body.count, 0);
                done()
            })
    })

    it('Delete to /api/concerts?id= can delete artist', done => {
        request(server)
            .post('/api/login')
            .expect(200)
            .send({username: "Test3", password: "test222"})
            .then((login) => { 
                Artist.findOne({ "name": "Simply Red" })
                    .then(artist => { 
                        Concert.findOne({ "artist": artist._id })
                            .then(concert => {
                                request(server)
                                    .delete('/api/concerts?id='+ concert._id)
                                    .set('x-access-token', login.body.token)
                                    .expect(200)
                                    .send()
                                    .end(() => {
                                        Concert.findOne({ "artist": artist._id, date: "12-12-2018" })
                                            .then((concert) => {
                                                assert(concert == null)
                                                done();
                                            })
                                    })
                            })
                    })
            })
    })
})
