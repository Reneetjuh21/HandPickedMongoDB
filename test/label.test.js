const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

//const CompanyController = require('../controllers/CompanyController');
//const Company = require('../models/Company');

describe('Routing and Integration Tests', () => {
    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    it('should return an error code 422 when postin an object without a name', (done) => {
        chai.request(server)
            .post('/api/user')
            .send({ name: ''})
            .end((err, res) => {
                res.should.have.status(422);
                done();
            })
    }).timeout(5000);

    it ('should accept valid data and return 200 status with saved object', (done) => {
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
});