const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Invoice = require('../models/Invoice')

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

chai.should();
chai.use(chaiHttp);

describe('InvoiceController', () => {
    it('Should return an error code 404 when posting an invoice without a version', (done) => {
        request(HOST)
            .post('/api/invoices')
            .send({ date: '12/12/2018/12:12:0', status: 'done', version: ''})
            .end((err, res) => {
                res.should.have.status(500);
                done();
            })
    }).timeout(5000);

    it ('Should return an invoice when posting a valid invoice', (done) => {
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

    it('Should return status 404 when an invoice is not found', (done) => {
                request(HOST)
                    .get('/api/invoices/' + "notAnIndeifier")

                    .end((err, res) => {
                        res.should.have.status(404);
                        res.should.be.a('object');

                        done()
            })
    }).timeout(5000)

    it ('Should return status 200 when deleting a valid invoice', (done) => {
        const goodInvoice = {
            date: '12/12/2018/12:12:0',
            status: 'done',
            version: '1'
        };
        request(HOST)
            .post('/api/invoices')
            .send(goodInvoice)
            .end((err, res) => {
                Invoice.findOne({date: "2018-12-12T11:12:00.000Z"})
                    .then((newInvoice) => {
                        request(HOST)
                            .delete('/api/invoices/' + newInvoice._id)
                            .expect(200, done);
                    })
            })
    });

    it ('Should return status 200 when changing a valid invoice', (done) => {
        const goodInvoice = {
            date: '12/12/2018/12:12:0',
            status: 'in prograss',
            version: '1'
        };
        request(HOST)
            .post('/api/invoices')
            .send(goodInvoice)
            .end((err, res) => {
                Invoice.findOne({date: "2018-12-12T11:12:00.000Z"})
                    .then((newInvoice) => {
                        request(HOST)
                            .put('/api/invoices')
                            .send({
                                id: newInvoice._id,
                                date: '12/15/2018/12:12:0',
                                status: 'done',
                                version: '2'
                            })
                            .expect(200, done);
                    })
            })
    });

    it ('Should return status 404 when chanching a non valid invoice by invalid id', (done) => {
        const goodInvoice = {
            date: '12/12/2018/12:12:0',
            status: 'in prograss',
            version: '1'
        };

        request(HOST)
            .put('/api/invoices')
            .send({
                id: "notAnIndeifier",
                date: '12/15/2018/12:12:0',
                status: 'done',
                version: '2'
            })
            .expect(404, done);
    });
});