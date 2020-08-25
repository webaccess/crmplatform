const request = require("co-supertest");
var assert = require("chai").assert;

const { SERVER_URL, PAYLOAD } = require("../config/config");
const { JWT } = require("../config/JWT");
let dataId;

describe("Activityassignee Module Endpoint", function () {
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
    describe("POST /crm-plugin/activityassignees/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation { createActivityassignee(input: { data: { } }) { activityassignee { activity{ id title } } } }",
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

      it("should create an entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation { createActivityassignee(input: { data: { contact : 6 , activities:[5]} }) { activityassignee { activity{ id title } } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.createActivityassignee.activityassignee.contact.id,
              6,
              "Object in response should not differ"
            );
            dataId = res.body.data.createActivityassignee.activityassignee.id;
            done();
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/activityassignees/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation{ updateActivityassignee(input: { where: {id : " +
              dataId +
              "} , data: { contact : 7} }) { activityassignee { activity{ id title } } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.updateActivityassignee.activityassignee.contact.id,
              7,
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/activityassignees", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ activityassignees{ id, activity{ id title } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isAtLeast(
              res.body.data.activityassignees.length,
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
    describe("GET /crm-plugin/activityassignees/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "{ activityassignee(id:" +
              dataId +
              "){ id, activity{ id title }} }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.activityassignee.contact.id,
              7,
              "FindOne Method should return response with same name"
            );
            done();
          });
      });
    });
  });

  describe("Count Method", function () {
    // case for count done here
    describe("GET /crm-plugin/activityassignees/count", function () {
      it("should return data count when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ activityassigneesCount }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isAtLeast(
              res.body.data.activityassigneesCount,
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
    describe("DELETE /crm-plugin/activityassignees/:id", function () {
      it("should delete entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation{ deleteActivityassignee(input: { where: {id : " +
              dataId +
              "} }) { activityassignee { id activity{ id title } } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              res.body.data.deleteActivityassignee.activityassignee.contact.id,
              7,
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });
});
