const assert = require('assert');
const request = require('supertest');
const server = require('../../index')
var User = require('../../models/User')
// const testHelper = require('../test_helper')

// testHelper.resetTestDB();

describe('User controller tests', () => {
    it('Post to api/users creates a new user', (done) => {
        request(server)
            .post('/api/users/')
            .send({
                username: "Test",
                password: "test222",
                fullname: "Test van der test",
                address: "Teststreet 93",
                postalcode: "3123DE",
                city: "TestCity",
                country: "Testland"
            })
            .expect(201)
            .end(() => {
                User.findOne({ username: "Test" })
                    .then(user => {
                    assert(user.username === "Test");
                    done()
                });
            });
    });
    it('Login with created User Put to /api/users/:username edits an existing User password', done => {
        request(server)
            .post('/api/login')
            .send({username: "Test", password: "test222"})
            .then((result) => {
                request(server)
                    .put('/api/users/')
                    .set('x-access-token', result.body.token)
                    .expect(200)
                    .send({password: "test222", newPassword: "test2" })
                    .end(() => {
                        User.findOne({ username: "Test" })
                            .then(user => {
                                assert(user.password === "test2")
                                done();
                            })
                    })
            });
    });

    it('Login with created User Put to /api/users/:username edits an existing User details (fullname and postalcode)', done => {
        request(server)
            .post('/api/login')
            .send({username: "Test", password: "test2"})
            .then((result) => {
                request(server)
                    .put('/api/users/')
                    .set('x-access-token', result.body.token)
                    .expect(200)
                    .send({fullname: "Henk de test", postalcode: "1234AB" })
                    .end(() => {
                        User.findOne({ username: "Test" })
                            .then(user => {
                                assert(user.fullname === "Henk de test")
                                assert(user.postalcode === "1234AB")
                                done();
                            })
                    })
            });
    });

    it('Login with created User Delete to /api/users/username can delete user', done => {
        request(server)
            .post('/api/login')
            .send({username: "Test", password: "test2"})
            .then((result) => {
                request(server)
                .delete('/api/users/')
                .set('x-access-token', result.body.token)
                .expect(200)
                .send({userId: result.userId, password: "test2" })
                .end(() => {
                    User.findOne({ username: "testDelete" })
                        .then((user) => {
                            console.log(user)
                            assert(user === null)
                            done();
                        });
                });
            });
        });
});