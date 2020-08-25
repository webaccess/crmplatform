const request = require("co-supertest");
var assert = require("chai").assert;

const { SERVER_URL, PAYLOAD } = require("../config/config");
const { JWT } = require("../config/JWT");
let dataId;

describe("Activitytype Module Endpoint", function () {
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
    describe("POST /crm-plugin/activitytypes/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation { createActivitytype(input: { data: { } }) { activitytype { id name } } }",
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
              "mutation { createActivitytype(input: { data: { is_active : true} }) { activitytype { id name } } }",
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
          .post("/graphql")
          .send({
            query:
              'mutation{ createActivitytype(input: { data: { name: "Fishery", is_active:false} }) { activitytype { id name } } }',
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.createActivitytype.activitytype.name,
              "Fishery",
              "Object in response should not differ"
            );
            dataId = res.body.data.createActivitytype.activitytype.id;
            done();
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/activitytypes/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation{ updateActivitytype(input: { where: {id : " +
              dataId +
              '} , data: { name: "Agriculture", is_active: false} }) { activitytype { id name } } }',
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.updateActivitytype.activitytype.name,
              "Agriculture",
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/activitytypes", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ activitytypes{ id, name} }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isAtLeast(
              res.body.data.activitytypes.length,
              1,
              "Find method should return atleast one response"
            );
            done();
          });
      });
    });
  });

  describe("FindOne Method", function () {
    // case for correct params done here
    describe("GET /crm-plugin/activitytypes/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ activitytype(id:" + dataId + "){ id, name} }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.activitytype.name,
              "Agriculture",
              "FindOne Method should return response with same name"
            );
            done();
          });
      });
    });
  });

  describe("Count Method", function () {
    // case for count done here
    describe("GET /crm-plugin/activitytypes/count", function () {
      it("should return data count when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ activitytypesCount }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isAtLeast(
              res.body.data.activitytypesCount,
              1,
              "Count expected to be atleast 1"
            );
            done();
          });
      });
    });
  });

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/activitytypes/:id", function () {
      it("should delete entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation{ deleteActivitytype(input: { where: {id : " +
              dataId +
              "} }) { activitytype { id name } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.deleteActivitytype.activitytype.name,
              "Agriculture",
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });
});
