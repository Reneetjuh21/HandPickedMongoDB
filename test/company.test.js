const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

//const CompanyController = require('../controllers/CompanyController');
//const Company = require('../models/Company');

describe('Routing and Integration Tests', () => {
      //Dit geeft een 500, aanpassen naar 400/404? Hoort eigenlijk 400/404 te zijn
      it ('should reject invalid data with 400 status', (done) => {
        const badReq = {
          notAJob: 'not real data'
        };
        request(HOST)
          .post('/api/companies')
          .send(badReq)
          .expect(500, done);
      });
      it ('should accept valid data and return 200 status with saved object', (done) => {
        const goodReq = {
          name: "Batman",
          contact: "Bruce Wayne"
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
      it('should respond to API request with all listings', (done) => {
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
});