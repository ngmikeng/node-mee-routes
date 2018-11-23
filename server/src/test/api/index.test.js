const httpStatus = require('http-status');
const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect;
const app = require('../../../config/app');
const BASE_ROUTE = "/api/v1";
const request = supertest(app);

describe("## Misc / Index", () => {
  describe(`# GET ${BASE_ROUTE}/health-check`, () => {
    it("should return OK", (done) => {
      request
        .get(`${BASE_ROUTE}/health-check`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal("OK");
          done();
        })
        .catch(done);
    });
  });

  describe(`# GET ${BASE_ROUTE}/not-found-route`, () => {
    it("should return 404 status", (done) => {
      request
        .get(`${BASE_ROUTE}/not-found-route`)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal("API not found");
          done();
        })
        .catch(done);
    });
  });
});