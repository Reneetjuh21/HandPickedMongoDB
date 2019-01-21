const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Label = require('../models/Label')

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

chai.should();
chai.use(chaiHttp);

describe('Labelcontroller', () => {
    it('Should return an error code 404 when postin an object without a name', (done) => {
        request(HOST)
            .post('/api/labels')
            .send({ name: ''})
            .end((err, res) => {
                res.should.have.status(500);
                done();
            })
    }).timeout(5000);

    it ('Should return a label when posting a valid label', (done) => {
        const goodLabel = {
            name: "Batman"
        };
        request(HOST)
            .post('/api/labels')
            .send(goodLabel)
            .expect((res) => {
                const expectedReq = {
                    name: goodLabel.name
                }
                expect(res.body).to.include(expectedReq);
            })
            .expect(201, done);
    });

    it('Should return status 404 when label is not found', (done) => {
        request(HOST)
            .post('/api/labels')
            .send({ name: 'testUser'})
            .end((err, res) => {
                request(HOST)
                    .get('/api/labels/' + "notAnIndeifier")

                    .end((err, res) => {
                        res.should.have.status(404);
                        res.should.be.a('object');

                        done()

                    })

            })
    }).timeout(5000)

    it ('Should return status 200 when deleting a valid label', (done) => {
        const goodLabel = {
            name: "Batman"
        };
        request(HOST)
            .post('/api/labels')
            .send(goodLabel)
            .end((err, res) => {
                Label.findOne({name: "Batman"})
                    .then((newLabel) => {
                        request(HOST)
                            .delete('/api/labels/' + newLabel._id)
                            .expect(200, done);
                    })
            })
    });

    it ('Should return status 200 when changing a valid label', (done) => {
        const goodLabel = {
            name: "Batman"
        };
        const newLabel = {
            name: "Robin"
        };
        request(HOST)
            .post('/api/labels')
            .send(goodLabel)
            .end((err, res) => {
                Label.findOne({name: "Batman"})
                    .then((newLabel) => {
                        request(HOST)
                            .put('/api/labels/' + newLabel._id)
                            .send(newLabel)
                            .expect(200, done);
                    })
            })
    });

    it ('Should return status 404 when changing a non valid label by invalid id', (done) => {
        request(HOST)
            .put('/api/labels/' + "notAnIndeifier")
            .send({
                name: "Robin"
            })
            .expect(404, done);
    });
});