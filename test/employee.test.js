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

    it('Should return a 404 when posting valid employee with non existing labelID', (done) => {
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
            .expect((res) => {
                expect(status(404))
            })
            done();
        })
    })

    it('Should return a 201 when posting a valid employee', (done) => {
        request(HOST)
        .post('/api/label')
        .send({
            name: "labelName"
        })
        .expect((res) => {
            expect(status(201))
        })
        done();
    })

    it('Should return a 404 while posting an invalid employee', (done) => {
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
            .expect((res) => {
                expect(status(404))
            })
            done();
        })
    })

})