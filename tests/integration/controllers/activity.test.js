const request = require("co-supertest");
var assert = require("chai").assert;

const { SERVER_URL, PAYLOAD } = require("../config/config");
let JWT;
let dataId;

describe("Activity Module Endpoint", function () {
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

  describe("Create Method", function () {
    // case for empty,required and correct params for Create method done here
    describe("POST /crm-plugin/activities/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/activities")
          .send({})
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else {
              done();
              assert.isEmpty(
                res.body,
                "Expected empty response as params are empty"
              );
            }
          });
      });

      it("should not create an entry when required params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/activities")
          .send({
            is_active: true,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else {
              assert.isEmpty(
                res.body,
                "Expected empty response as required params are missing"
              );
              done();
            }
          });
      });

      it("should create an entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/activities")
          .send({
            title: "Activity 1",
            activitytype: 5,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            dataId = res.body.id;
            if (err) done(err);
            else {
              assert.include(
                res.body,
                { title: "Activity 1" },
                "Expected params not found"
              );
              done();
            }
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/activities/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .put("/crm-plugin/activities/" + dataId)
          .send({
            title: "Activity 2",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) done(err);
            else {
              assert.include(
                res.body,
                { title: "Activity 2" },
                "Expected params not found"
              );
              done();
            }
          });
      });
    });
  });

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/activities", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/activities")
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) done(err);
            else {
              assert.isAtLeast(
                res.body.length,
                1,
                "Expected length do not match"
              );
              done();
            }
          });
      });
    });
  });

  describe("FindOne Method", function () {
    //case for correct params done here
    describe("GET /crm-plugin/activities/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/activities/" + dataId)
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) done(err);
            else {
              assert.include(
                res.body,
                { title: "Activity 2" },
                "Expected params not found"
              );
              done();
            }
          });
      });
    });
  });

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/activities/:id", function () {
      it("should delete entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .delete("/crm-plugin/activities/" + dataId)
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) done(err);
            else {
              assert.include(
                res.body,
                { title: "Activity 2" },
                "Expected params not found"
              );
              done();
            }
          });
      });
    });
  });
});
