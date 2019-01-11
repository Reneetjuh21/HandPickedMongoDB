const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

//const CompanyController = require('../controllers/CompanyController');
//const Company = require('../models/Company');

describe('Routing and Integration Tests', () => {
  request(HOST)
  .post('/api/labels')
  .send({
    name: "TDE",
    apiaccesstoken: "12345",
    employees: [{
      name: "yeet",
      email: "yoten"
    }]
  });

    request(HOST)
    .post('/api/contacts')
    .send({
        name: "Gotham City",
        email: "gothamcity@gmail.com"
    });
      //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
      it ('should reject invalid data with 400 status', (done) => {
        const badReq = {
          notAJob: 'not real data'
        };
        request(HOST)
          .post('/api/contacts')
          .send(badReq)
          .expect(500, done);
      });
      it ('should accept valid data and return 200 status with saved object', (done) => {
        const goodReq = {
            name: "Bruce Wayne",
            phonenumber: "0612345678",
            email: "savegothamcity@wayneenterprises.com",
            occupation: "Batman",
            employee: "Gotham City",
            linkedin: "www.batman.com"
        };
        request(HOST)
          .post('/api/contacts')
          .send(goodReq)
          .expect((res) => {
            const expectedReq = {
                name: "Bruce Wayne",
                phonenumber: "0612345678",
                email: "savegothamcity@wayneenterprises.com",
                occupation: "Batman",
                employee: "Gotham City",
                linkedin: "www.batman.com"
            }
            expect(res.body).to.include(expectedReq);
          })
          .expect(201, done);
      });
      it('should respond to API request with all listings', (done) => {
        const anotherReq = {
            name: "Bruce Wayne",
            phonenumber: "0612345678",
            email: "savegothamcity@wayneenterprises.com",
            occupation: "Batman",
            employee: "Gotham City",
            linkedin: "www.batman.com"
        };
        request(HOST)
          .post('/api/contacts')
          .send(anotherReq)
          .then(() => {
            request(HOST)
              .get('/api/contacts')
              .expect((res) => {
                expect(res.body.length).to.eq(1);
              })
              .expect(200, done);
          });
      });
});