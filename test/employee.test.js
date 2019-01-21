const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const Employee = require('../models/Employee');
const Label = require('../models/Label')

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

chai.should();
chai.use(chaiHttp);

describe('EmployeeController', () => {

    it('Should return a 500 when posting valid employee with non existing labelID', (done) => {
        request(HOST)
        .post('/api/labels')
        .send({
            name: "label"
        })
        .then(() => {
            request(HOST)
                .post('/api/employees/'+ 12345)
                .send({
                    name: "TestEmployee",
                    email: "email"
                })
                .expect(422, done);
        })
    })

     it('Should return a 201 when posting a valid employee', (done) => {
        request(HOST)
        .post('/api/labels')
        .send({
            name: "labelName"
        })
        .then(()=> {
            request(HOST)
            .get('/api/labels')
            .end(() => {
                Label.findOne({name: "labelName"})
                .then((newLabel) => {
                    request(HOST)
                        .post('/api/employees/' + newLabel._id)
                        .send({
                            name: "Batman",
                            email: "Batman@batcave.com"
                        })
                        .expect((res) => {
                            expect(res.body.message).to.include("Employee has been succesfully added to Label.")
                            expect(res.body.code).to.equal(201)
                            expect(res.body.label.name).to.equal(newLabel.name)
                        })
                        .expect(201, done)
                })
            })
        })
    })
   

    it('Should return a 500 while posting an invalid employee', (done) => {
        request(HOST)
        .post('/api/labels')
        .send({
            name: "label"
        })
        .then(() => {
            request(HOST)
            .post('/api/employees/'+ 12345)
            .send({
                name: "TestEmployee",
            })
            .expect(500, done)
        })
    })

})