const request = require("co-supertest");

const { JWT, SERVER_URL } = require("../config/config");

describe("District Module Endpoint", function () {
  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/districts", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/districts")
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });

  describe("FindOne Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/districts/:id", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/districts")
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

  describe("Create Method", function () {
    // case for empty,required and correct params for Create method done
    describe("POST /crm-plugin/districts/", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/districts")
          .send({})
          .set("Authorization", "Bearer " + JWT)
          .expect(400)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });

      it("Required params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/districts")
          .send({
            is_active: true,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(400)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            done(err);
          });
      });

      it("Correct params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/districts")
          .send({
            name: "Thane",
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

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/districts/:id", function () {
      it("Updating params test case", function (done) {
        const id = 1;
        request(SERVER_URL)
          .put("/crm-plugin/districts/" + id)
          .send({
            name: "Sangli",
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

  describe("Count Method", function () {
    // case for count done here
    describe("GET /crm-plugin/districts/count", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/districts/count")
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8")
          .end(function (err, res) {
            done(err);
          });
      });
    });
  });

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/districts/:id", function () {
      it("Correct params test case", function (done) {
        const id = 1;
        request(SERVER_URL)
          .delete("/crm-plugin/districts/" + id)
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
