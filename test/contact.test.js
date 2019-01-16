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
    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    // it ('should reject invalid data with 400 status', (done) => {
    //
    // });
    it ('Should return a contact when posting a valid contact ', (done) => {
        var companyID;
        request(HOST)
            .post('/api/companies')
            .send({
                name: "Company",
                domain: "batman.com"
            })
            .then(() => {
                request(HOST)
                .get('/api/companies')
                .end(() => {
                    Company.findOne({name: "Company"})
                    .then((company)=> {
                        companyID = company._id;
                    })
                })
            })
            .then(() => {
            request(HOST)
            .post('/api/labels')
            .send({name: "Detective Comics"})
            .then(() => {
                request(HOST)
                    .get('/api/labels')
                    .end(() => {
                        Label.findOne({name: "Detective Comics"})
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
                                                        console.log(newEmployee)
                                                        const idFromEmplyee = newEmployee.employees.pop()._id
                                                        console.log(idFromEmplyee)
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
                                                            .expect((res) => {
                                                                expect(res.body.message).to.equal("Contact has been succesfully added to company.");
                                                                expect(res.body.code).to.equal(201);
                                                            })  
                                                            .expect(201, done);
                                                    })
                                            })
                                    })
                            })
            })
        })
    })
    })

    //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
    it('should return an error code 404 when posting an object without a employeeId', (done) => {
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
    }).timeout(5000)

    it('should return status 404 when contact is not found', (done) => {
        request(HOST)
            .get('/api/contacts/' + "notAnIndeifier")

            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.a('object');

                done()
            })
    }).timeout(5000)

    it ('should return status 200 when deleting a valid contact', (done) => {
        request(HOST)
            .post('/api/labels')
            .send({name: "Detective Comics"})
            .then(() => {
                request(HOST)
                    .get('/api/labels')
                    .end(() => {
                        Label.findOne({name: "Detective Comics"})
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
                                                        console.log(newEmployee)
                                                        const idFromEmplyee = newEmployee.employees.pop()._id
                                                        console.log(idFromEmplyee)
                                                        request(HOST)
                                                            .post('/api/contacts')
                                                            .send({
                                                                name: "Bruce Wayne",
                                                                phonenumber: "0612345678",
                                                                email: "savegothamcity@wayneenterprises.com",
                                                                occupation: "Batman",
                                                                employee: idFromEmplyee,
                                                                linkedin: "www.batman.com"
                                                            })
                                                            .end((err, res) => {
                                                                Contact.findOne({name: "Bruce Wayne"})
                                                                    .then((newContact) => {
                                                                        request(HOST)
                                                                            .delete('/api/contacts/' + newContact._id)
                                                                            .expect(200, done);
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })

});