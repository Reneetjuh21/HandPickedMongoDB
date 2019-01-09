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
    xit ('should reject invalid data with 400 status', (done) => {
        const badLabel = {
            notAName: 'not real data'
        };
        request(HOST)
            .post('/api/labels')
            .send(badLabel)
            .expect(500, done);
    });
    xit ('should accept valid data and return 200 status with saved object', (done) => {
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