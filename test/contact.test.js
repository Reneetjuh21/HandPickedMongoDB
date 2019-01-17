const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const Label = require('../models/Label');
const Contact = require('../models/Contact');
const Company = require('../models/Company');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

chai.should();
chai.use(chaiHttp);

describe('ContactController', () => {
    var companyID;

    it ('Should return a contact when posting a contact', (done) => {
        request(HOST)
        .post('/api/labels')
        .send({name: "Test2"})
        .then(() => {
            request(HOST)
                .get('/api/labels')
                .end(() => {
                    Label.findOne({name: "Test2"})
                        .then((newLabel) => {
                            request(HOST)
                                .post('/api/employees/' + newLabel._id)
                                .send({
                                    name: "Batman",
                                    email: "batman@batcave.com"
                                })
                                .then(() => {
                                    request(HOST)
                                        .get('/api/labels')
                                        .end(() => {
                                            Label.findById(newLabel._id)
                                                .then((newEmployee) => {
                                                    const idFromEmplyee = newEmployee.employees.pop()._id
                                                    request(HOST)
                                                        .post('/api/deals')
                                                        .send({
                                                            title: "Batmobile",
                                                            deadline: "12/12/2018/12:12:0",
                                                            percentage: "12",
                                                            sum: "12",
                                                            company: "5c1b87ed1e121200162fd47b",
                                                            description: "Deal",
                                                            valuta: "euro",
                                                            employeeId: idFromEmplyee
                                                        })
                                                        //.expect(201, done)
                                                        .then(() => {
                                                            request(HOST)
                                                            .post('/api/companies')
                                                            .send({
                                                                name: "Company"
                                                            })
                                                            .end(() => {
                                                                Company.findOne({name: "Company"})
                                                                .then((company)=> {
                                                                    companyID = company._id;
                                                                    request(HOST)
                                                                    .post('/api/contacts')
                                                                    .send({
                                                                        name: "Bruce Wayne",
                                                                        phonenumber: "0612345678",
                                                                        email: "savegothamcity@wayneenterprises.com",
                                                                        occupation: "Batman",
                                                                        employee: idFromEmplyee,
                                                                        linkedin: "www.batman.com",
                                                                        companyId: companyID
                                                                    })
                                                                    .expect(201, done)
                                                                    done()
                                                                })
                                                            })
                                                        })
                                               })
                                        })
                                })
                        })
                    })
                })
            })

    it ('Should reject request when posting invalid contact', (done) => {
        const badReq = {
          notAJob: 'not real data'
        };
        request(HOST)
          .post('/api/contacts')
          .send(badReq)
          .expect(500, done);
      });

      it('should return an error code when posting an object without a employeeId', (done) => {
        request(HOST)
            .post('/api/contacts')
            .send({
                name: "Bruce Wayne",
                phonenumber: "0612345678",
                email: "savegothamcity@wayneenterprises.com",
                occupation: "Batman",
                linkedin: "www.batman.com"
            })
            .end((err, res) => {
                res.should.have.status(500);
                done();
            })
        })
    })
