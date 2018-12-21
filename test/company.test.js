const request = require('supertest');
const app = require('../index');
const expect = require('chai').expect;
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

//const CompanyController = require('../controllers/CompanyController');
//const Company = require('../models/Company');

describe('Routing and Integration Tests', () => {
  describe('Controller Tests', () => {
    describe('CompanyController', () => {
      before((done) => {
        mongoose.connect('mongodb://localhost/HandPicked', function(){
            mongoose.connection.db.dropDatabase(() => {
                console.log('Cleaning - test database dropped');
                });
        });
      return done();
      });
      it ('should reject invalid data with 400 status', (done) => {
        const badReq = {
          notAJob: 'not real data',
        };
        request(HOST)
          .post('/post')
          .send(badReq)
          .expect(404, done);
      });
      it ('should accept valid data and return 200 status with saved object', (done) => {
        const goodReq = {
          name: 'Jane Doe',
          contacts: [{
              name: 'exampleName',
              phoneNumber: '0612345678',
              email: 'test@mail.com',
              employee: 'Teun'
          }]
        };
        request(HOST)
          .post('/post')
          .send(goodReq)
          .expect((res) => {
            expect(res.body).to.include(goodReq);
          })
          .expect(200, done);
      });
      it('should respond to API request with all listings', (done) => {
        const anotherReq = {
            name: 'John Doe',
            contacts: [{
                name: 'exampleName',
                phoneNumber: '0612345678',
                email: 'test@mail.com',
                employee: 'Teun'
            }]
        };
        request(HOST)
          .post('/post')
          .send(anotherReq)
          .then(() => {
            request(HOST)
              .get('/api')
              .expect((res) => {
                expect(res.body.length).to.eq(2);
              })
              .expect(200, done);
          });
      });   
      
      after(() => {
        mongoose.connection.close(() => {
          console.log('Test database connection closed');
        });
      });
    });
  });
});