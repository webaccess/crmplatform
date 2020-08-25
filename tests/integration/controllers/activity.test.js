const request = require("co-supertest");
var assert = require("chai").assert;
const fs = require("fs");
const { SERVER_URL, PAYLOAD } = require("../config/config");
const { JWT } = require("../config/JWT");
let dataId;

describe("Activity Module Endpoint", function () {
  describe("Create Method", function () {
    console.log("JWT", JWT);
    // case for empty,required and correct params for Create method done here
    describe("POST /crm-plugin/activities/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation { createActivity(input: { data: { } }) { activity { id title } } }",
          })
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
          .post("/graphql")
          .send({
            query:
              "mutation { createActivity(input: { data: { is_active : true } }) { activity { id title } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) return done(err);
            assert.isEmpty(
              res.body,
              "Empty response is expected when params are empty"
            );
            done();
          });
      });

      it("should create an entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              'mutation { createActivity(input: { data: { title : "activity 1" } }) { activity { id title } } }',
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.createActivity.activity.title,
              "activity 1",
              "Object in response should not differ"
            );
            dataId = res.body.data.createActivity.activity.id;
            done();
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/activities/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation { updateActivity(input: { where: { id : " +
              dataId +
              '} , data: { title : "Activity 2" } }) { activity { id title } } }',
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.updateActivity.activity.title,
              "Activity 2",
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/activities", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ activities{ id, title} }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isAtLeast(
              res.body.data.activities.length,
              1,
              "Find method should return atleast one response"
            );
            done();
          });
      });
    });
  });

  describe("FindOne Method", function () {
    //case for correct params done here
    describe("GET /crm-plugin/activities/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ activity(id:" + dataId + ") { id title } }",
          })

          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.activity.title,
              "Activity 2",
              "FindOne Method should return response with same name"
            );
            done();
          });
      });
    });
  });

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/activities/:id", function () {
      it("should delete entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation { deleteActivity(input: { where: { id : " +
              dataId +
              "} }) { activity { id title } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.deleteActivity.activity.title,
              "Activity 2",
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });
});
