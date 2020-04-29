const request = require("co-supertest");

const { JWT, SERVER_URL } = require("../config/config");

describe("States Module Endpoint", function () {
  //Empty params test case
  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/states", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/states")
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });
  describe("Create Method", function () {
    // case for empty params done here
    describe("POST /crm-plugin/states/", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/states")
          .send({})
          .set("Authorization", "Bearer " + JWT)
          .expect(400)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });
  describe("Delete Method", function () {
    // case for empty params done here
    describe("DELETE /crm-plugin/states/", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .delete("/crm-plugin/states/")
          .set("Authorization", "Bearer " + JWT)
          .expect(404)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });
  describe("FindOne Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/states/:id", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/states")
          .send({
            id: 1,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });
  //Required params test case
  describe("Create Method", function () {
    // case for required params done here
    describe("POST /crm-plugin/states/", function () {
      it("Required params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/states")
          .send({
            is_Active: true,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(400)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });

  //Correct params testcase
  describe("Create Method", function () {
    describe("POST /crm-plugin/states/", function () {
      it("Correct params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/states")
          .send({
            name: "Gujarat",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });
});
