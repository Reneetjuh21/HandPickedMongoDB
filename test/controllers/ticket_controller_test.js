const assert = require('assert');
const request = require('supertest');
const mongoose = ('mongoose');
const server = require('../../index')
const Artist = require('../../models/Artist')
const Concert = require('../../models/Concert')
const Ticket = require('../../models/Ticket')
// const testHelper = require('../test_helper')

// testHelper.resetTestDB();

describe("Ticket Controller Tests", () => {
    it("Controller creates Ticket", (done) => {
        request(server)
            .post('/api/users/')
            .send({
                username: "Test4",
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
                    .send({username: "Test4", password: "test222"})
                    .then((login) => {
                        request(server)
                            .post("/api/artists")
                            .set('x-access-token', login.body.token)
                            .expect(201)
                            .send({ name: "Foo Fighters", description: "If you don't know me by now, you will never ever know me.", genre: "Jazz, Pop", img: "https://sublime.nl/wp-content/uploads/2016/11/b6ce039648d6d381fbd4321aa338bf17.jpg" })
                            .then((artist) => {
                                request(server)
                                    .post("/api/concerts")
                                    .set('x-access-token', login.body.token)
                                    .expect(201)
                                    .send({ artist: artist.body.artist._id, date: "12-12-2018", ticketPrice: 40, capacity: 5000 })
                                    .then((concert) => {
                                        request(server)
                                            .post("/api/tickets")
                                            .set('x-access-token', login.body.token)
                                            .expect(201)
                                            .send({ concertId: concert.body.concert._id, ticketValue: 1})
                                            .then((result) => {
                                                assert.notEqual(result.body.tickets, 0);
                                                done();
                                            })
                                    })
                            })
                    })
            })
    })
    
    it('Delete to /api/ticket?id= can delete ticket', done => {
        request(server)
            .post('/api/login')
            .expect(200)
            .send({username: "Test4", password: "test222"})
            .then((login) => { 
                Artist.findOne({ "name": "Foo Fighters" })
                    .then(artist => { 
                        Concert.findOne({ "artist": artist._id })
                            .then(concert => {
                                request(server)
                                    .delete('/api/tickets?cId='+ concert._id +'&tId='+concert.tickets[0]._id)
                                    .set('x-access-token', login.body.token)
                                    .expect(200)
                                    .send()
                                    .end(() => {
                                        Concert.findOne({ "artist": artist._id })
                                            .then((concert) => {
                                                assert.equal(concert.tickets.length, 0)
                                                done();
                                            })
                                    })
                            })
                    })
            })
    })
})
