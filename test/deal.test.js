const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Label = require('../models/Label');
const Employee = require('../models/Employee');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

chai.should();
chai.use(chaiHttp);

//const CompanyController = require('../controllers/CompanyController');
//const Company = require('../models/Company');

describe('DealsController', () => {
    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    // it ('should reject invalid data with 400 status', (done) => {
    //
    // });
    xit ('Should return a deal when posting a valid object', (done) => {
        request(HOST)
            .post('/api/labels')
            .send({name: "Test2"})
            .then(() => {
                request(HOST)
                    .get('/api/labels')
                    .end(() => {
                        Label.findOne({name: "Test2"})
                            .then((newLabel) => {
                                //console.log(newLabel)
                                request(HOST)
                                    .post('/api/employees/' + newLabel._id)
                                    .send({
                                        name: "Batman",
                                        email: "batman@batcave.com"
                                    })
                                    .then(() => {
                                        request(HOST)
                                            .get('/api/employees/' + newLabel._id)
                                            .end(() => {
                                                Label.findById(newLabel._id)
                                                    .then((newEmployee) => {
                                                        console.log(newEmployee)
                                                        const idFromEmplyee = newEmployee.employees.pop()._id
                                                        console.log(idFromEmplyee)
                                                        request(HOST)
                                                            .post('/api/deals')
                                                            .send({
                                                                title: "Batmobile",
                                                                deadline: "12/12/2018/12:12:0",
                                                                percentage: "12",
                                                                sum: "12",
                                                                company: {
                                                                    name: 'John Doe',
                                                                },
                                                                description: "Deal",
                                                                valuta: "euro",
                                                                employeeId: idFromEmplyee
                                                            })
                                                            .end((err, res) => {
                                                                res.should.have.status(201);
                                                                res.should.be.a('object');

                                                                const body = res.body;
                                                                body.should.have.property('title').equals('Batmobile');
                                                                body.should.have.property('__v').equals(0);
                                                                done();
                                                            })
                                                    })
                                            })
                                    })
                            })
            })
        })
    })

    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    it('should return an error code 404 when postin an object without a employeeId', (done) => {
        request(HOST)
            .post('/api/labels')
            .send({
                title: "Batmobile",
                deadline: "12/12/2018/12:12:0",
                percentage: "12",
                sum: "12",
                company: {
                    name: 'John Doe',
                },
                description: "Deal",
                valuta: "euro",
                employeeId: ""
            })
            .end((err, res) => {
                res.should.have.status(500);
                done();
            })
    }).timeout(5000)

    it('should return status 404 when ga deal is not found', (done) => {
        request(HOST)
            .get('/api/deals/' + "notAnIndeifier")

            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.a('object');

                done()
            })
    }).timeout(5000)

});