const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect;
const app = require('../../../config/app');
const config = require('../../../config/config');
const request = supertest(app);
const BASE_ROUTE = "/api/v1/auth";

describe("## Auth API", () => {
  const validUserCredentials = {
    username: "react",
    password: "express"
  };
  const invalidUserCredentials = {
    username: "react",
    password: "wrongPass"
  };
  let authToken;

  describe(`# POST ${BASE_ROUTE}/login`, () => {
    it("should return Authentication error", (done) => {
      request
        .post(`${BASE_ROUTE}/login`)
        .send(invalidUserCredentials)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal("Authentication error");
          done();
        })
        .catch(done);
    });

    it("should return Bad Request error", (done) => {
      request
        .post(`${BASE_ROUTE}/login`)
        .send({ username: "", password: "" })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal("validation error");
          done();
        })
        .catch(done);
    });

    it("should return valid JWT token", (done) => {
      request
        .post(`${BASE_ROUTE}/login`)
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.token).is.not.empty;
          jwt.verify(res.body.data.token, config.jwtSecret, (err, decoded) => {
            expect(err).is.null;
            expect(decoded.username).to.equal(validUserCredentials.username);
            authToken = res.body.data.token;
            done();
          });
        })
        .catch(done);
    });
  });

  describe(`# GET ${BASE_ROUTE}/randomNumber`, () => {
    it("should return Unauthorized error when get random number because of no set Authentication in header", (done) => {
      request
        .get(`${BASE_ROUTE}/randomNumber`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal("Unauthorized error");
          done();
        })
        .catch(done);
    });

    it("should return Unauthorized error when get random number because of set invalid auth token", (done) => {
      request
        .get(`${BASE_ROUTE}/randomNumber`)
        .set("Authorization", "Bearer invalid-token")
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal("Unauthorized error");
          done();
        })
        .catch(done);
    });

    it("should return a number", (done) => {
      request
        .get(`${BASE_ROUTE}/randomNumber`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.num).to.be.a("number");
          done();
        })
        .catch(done);
    });
  });
});