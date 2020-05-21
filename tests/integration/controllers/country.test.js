const request = require("co-supertest");
var assert = require("chai").assert;
// var assert = require("chai").expect;

const { SERVER_URL, PAYLOAD } = require("../config/config");
let JWT;
let dataId;

describe("Country Module Endpoint", function () {
  before(function (done) {
    request(SERVER_URL)
      .post("/auth/local")
      .send(PAYLOAD)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        const response = res.body;
        JWT = response["jwt"];
        done();
      });
  });

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/countries", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/countries")
          .set("Authorization", "Bearer " + JWT)
          .end(function (err, res) {
            assert.equal(res.statusCode, 200, "Status code ");
            assert.typeOf(
              res.headers["content-type"],
              "application/json; charset=utf-8",
              "Content Type"
            );
            if (err) done(err);
            else done();
          });
      });
    });
  });

  describe("Create Method", function () {
    // case for empty,required and correct params for Create method done here
    describe("POST /crm-plugin/countries/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/countries")
          .send({})
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });

      it("should not create an entry when required params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/countries")
          .send({
            is_active: true,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });

      it("should create an entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/countries")
          .send({
            name: "Algeria",
            is_active: true,
            abbreviation: "DZ",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            dataId = res.body.id;
            if (err) done(err);
            else done();
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/countries/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .put("/crm-plugin/countries/" + dataId)
          .send({
            name: "United States",
            abbreviation: "US",
            is_active: false,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });
    });
  });

  describe("FindOne Method", function () {
    // case for correct params done here
    describe("GET /crm-plugin/countries/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/countries")
          .send({
            id: dataId,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });
    });
  });

  describe("Count Method", function () {
    // case for count done here
    describe("GET /crm-plugin/countries/count", function () {
      it("should return data count when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/countries/count")
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });
    });
  });

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/countries/:id", function () {
      it("should delete entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .delete("/crm-plugin/countries/" + dataId)
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });
    });
  });
});
