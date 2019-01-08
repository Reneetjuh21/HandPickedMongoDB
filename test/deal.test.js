const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

//const CompanyController = require('../controllers/CompanyController');
//const Company = require('../models/Company');

describe('DealsController', () => {
    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    // it ('should reject invalid data with 400 status', (done) => {
    //
    // });
    it ('should accept valid data and return 200 status with saved object', (done) => {
        const Deal = {
            title: "Batman",
            deadline: "12/12/2018/12:12:0",
            percentage: "12",
            sum: "12",
            company: {
                name: 'John Doe',
            },
            description: "Deal",
            valuta: "euro"
        };
        request(HOST)
            .post('/api/deals')
            .send(Deal)
            .expect((res) => {
                const expectedReq = {
                    name: Deal.name
                }
                expect(res.body).to.include(expectedReq);
            })
            .expect(201, done);
    });
    // it('should respond to API request with all listings', (done) => {
    //
    // });
});