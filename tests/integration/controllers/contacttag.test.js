const request = require("co-supertest");
var assert = require("chai").assert;

const { SERVER_URL, PAYLOAD } = require("../config/config");
const { JWT } = require("../config/JWT");
let dataId;

describe("Contacttag Module Endpoint", function () {
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
    describe("POST /crm-plugin/contacttags/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation { createContacttag(input: { data: { } }) { contacttag { id contact{id name} } } }",
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
          // .post("/crm-plugin/contacttags")
          // .send({
          //   contact: {
          //     id: 6,
          //   },
          // });
          .post("/graphql")
          .send({
            query:
              "mutation { createContacttag(input: { data: { contact : 4 } }) { contacttag { id contact{ id name } } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              parseInt(res.body.data.createContacttag.contacttag.contact.id),
              4,
              "Object in response should not differ"
            );
            dataId = parseInt(res.body.data.createContacttag.contacttag.id);
            done();
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/contacttags/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation{ updateContacttag(input: { where: {id : " +
              dataId +
              "} , data: { contact : 5} }) { contacttag { id contact{ id name } } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              parseInt(res.body.data.updateContacttag.contacttag.contact.id),
              5,
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/contacttags", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ contacttags{ id, contact{ id name } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            assert.isAtLeast(
              res.body.data.contacttags.length,
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
    describe("GET /crm-plugin/contacttags/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query: "{ contacttag(id:" + dataId + "){ id, contact{ id name }} }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              parseInt(res.body.data.contacttag.contact.id),
              5,
              "FindOne Method should return response with same name"
            );
            done();
          });
      });
    });
  });

  describe("Count Method", function () {
    // case for count done here
    describe("GET /crm-plugin/contacttags/count", function () {
      it("should return data count when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contacttags/count")
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.isAtLeast(res.body, 1, "Count expected to be atleast 1");
            done();
          });
      });
    });
  });

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/contacttags/:id", function () {
      it("should delete entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/graphql")
          .send({
            query:
              "mutation{ deleteContacttag(input: { where: {id : " +
              dataId +
              "} }) { contacttag { id contact{ id name } } } }",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            assert.strictEqual(
              parseInt(res.body.data.deleteContacttag.contacttag.contact.id),
              5,
              "Object in response should not differ"
            );
            done();
          });
      });
    });
  });
});
