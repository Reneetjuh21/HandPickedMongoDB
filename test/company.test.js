const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;


describe('CompanyController', () => {
      it ('Should reject invalid data with 400 status', (done) => {
        const badReq = {
          notAJob: 'not real data'
        };
        request(HOST)
          .post('/api/companies')
          .send(badReq)
          .expect(500, done);
      });
      it ('Should accept valid data and return 200 status with company', (done) => {
        const goodReq = {
          name: "Batman",
        };
        request(HOST)
          .post('/api/companies')
          .send(goodReq)
          .expect((res) => {
            const expectedReq = {
              name: goodReq.name
            }
            expect(res.body).to.include(expectedReq);
          })
          .expect(201, done);
      });
      it('Should return companies with valid get request', (done) => {
        const anotherReq = {
            name: 'John Doe',
            contact: {
                name: 'exampleName',
                phoneNumber: '0612345678',
                email: 'test@mail.com',
                employee: 'Teun',
                occupation: "Hero",
                employee: "Gotham City",
                linkedin: "linkedIn"
            }
        };
        request(HOST)
          .post('/api/companies')
          .send(anotherReq)
          .then(() => {
            request(HOST)
              .get('/api/companies')
              .expect((res) => {
                expect(res.body.length).to.eq(1);
              })
              .expect(200, done);
          });
      });

      it('Should receive a 201 when posting a company with domain', (done) => {
        request(HOST)
        .post('/api/companies')
        .send({
          name: "Companyname",
          domain: "Domain"
        })
        .expect(201, done);
      });

});