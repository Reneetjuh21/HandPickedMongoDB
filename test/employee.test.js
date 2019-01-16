const request = require('supertest');
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
const Employee = require('../models/Employee');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

chai.should();
chai.use(chaiHttp);

describe('EmployeeController', () => {
    var newLabelId;
    request(HOST)
    .post('/api/labels')
    .send({
        name: "label"
    })
    .then( () => {
        request(HOST)
        .get('/api/labels')
        .end(() => {
            Label.findOne({name: "label"})
            .then((newLabel) => {
                newLabelId = newLabel._id;
            })
        })
    })


    it ('Should return a 201 after posting a valid employee ', (done) => {
        request(HOST)
        .post('/api/employees/'+ newLabelId)
        .send({
            name: "TestEmployee",
            email: "testemployee@gmail.com"
        })
        
        .expect((res) => {
            expect(res.body.message).to.equal("Employee has been succesfully added to Label.");
            expect(res.body.code).to.equal(201);
            done()
        })
    }).timeout(5000)

    it('Should return a employee from correct label after a GET request with a valid labelId', (done) => {
        request(HOST)
        .get('/api/employees/'+ newLabelId)
        .expect((res) => {
            expect(res.body.name).to.equal("label")
            expect(res.body.employees).to.contain("TestEmployee")
        })
    })


});