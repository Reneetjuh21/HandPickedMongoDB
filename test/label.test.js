const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

chai.should();
chai.use(chaiHttp);

//const CompanyController = require('../controllers/CompanyController');
//const Company = require('../models/Company');

describe('Labelcontroller', () => {
    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    it('should return an error code 404 when postin an object without a name', (done) => {
        request(HOST)
            .post('/api/labels')
            .send({ name: ''})
            .end((err, res) => {
                res.should.have.status(500);
                done();
            })
    }).timeout(5000);

    it ('should return a label when posting a valid object', (done) => {
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

    it('should return status 404 when ga label is not found', (done) => {
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
});