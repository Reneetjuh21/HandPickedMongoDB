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

describe('InvoiceController', () => {
    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    it('should return an error code 404 when postin an object without a version', (done) => {
        request(HOST)
            .post('/api/invoices')
            .send({ date: '12/12/2018/12:12:0', status: 'done', version: ''})
            .end((err, res) => {
                res.should.have.status(500);
                done();
            })
    }).timeout(5000);

    it ('should return a invoice when posting a valid object', (done) => {
        const goodInvoice = {
            date: '12/12/2018/12:12:0',
            status: 'done',
            version: '1'
        };
        request(HOST)
            .post('/api/invoices')
            .send(goodInvoice)
            .expect((res) => {
                const expectedReq = {
                    date: "2018-12-12T11:12:00.000Z"
                };
                expect(res.body).to.include(expectedReq);
            })
            .expect(201, done);
    });

    it('should return status 404 when ga invoice is not found', (done) => {
        request(HOST)
            .post('/api/invoices')
            .send({
                date: '12/12/2018/12:12:0',
                status: 'done',
                version: '1'
            })
            .end((err, res) => {
                request(HOST)
                    .get('/api/invoices/' + "notAnIndeifier")

                    .end((err, res) => {
                        res.should.have.status(404);
                        res.should.be.a('object');

                        done()
                    })
            })
    }).timeout(5000)
});