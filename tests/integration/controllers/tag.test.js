const request = require("co-supertest");
var assert = require("chai").assert;

const { SERVER_URL, PAYLOAD } = require("../config/config");
const { JWT } = require("../config/JWT");
let dataId;

describe("Tags Module Endpoint", function () {
  // before(function (done) {
  //   request(SERVER_URL)
  //     .post("/auth/local")
  //     .send(PAYLOAD)
  //     .expect(200)
  //     .expect("Content-Type", /json/)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       const response = res.body;
  //       JWT = response["jwt"];
  //       done();
  //     });
  // });

  describe("Create Method", function () {
    // case for empty,required and correct params for Create method done here
    describe("POST /crm-plugin/tags/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/tags")
          .send({})
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isEmpty(
              res.body,
              "Empty response is expected when params are empty"
            );
            done();
          });
      });

      it("should not create an entry when required params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/tags")
          .send({
            is_active: true,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isEmpty(
              res.body,
              "Empty response is expected when required params are missing"
            );
            done();
          });
      });

      it("should create an entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/tags")
          .send({
            name: "Tag 1",
            contacts: [6],
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.name,
              "Tag 1",
              "Object in response should not differ"
            );
            dataId = res.body.id;
            done();
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/tags/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .put("/crm-plugin/tags/" + dataId)
          .send({
            name: "Tag 2",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.name,
              "Tag 2",
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/tags", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/tags")
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isAtLeast(
              res.body.length,
              1,
              "Find method should return atleast one response."
            );
            done();
          });
      });
    });
  });

  describe("FindOne Method", function () {
    // case for correct params done here
    describe("GET /crm-plugin/tags/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/tags/" + dataId)
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.name,
              "Tag 2",
              "FindOne Method should return response with same name"
            );
            done();
          });
      });
    });
  });

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/tags/:id", function () {
      it("Correct params test case", function (done) {
        request(SERVER_URL)
          .delete("/crm-plugin/tags/" + dataId)
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.name,
              "Tag 2",
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });
});
