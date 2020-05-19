const request = require("co-supertest");

const { JWT, SERVER_URL } = require("../config/config");
let dataId;

describe("Contacttag Module Endpoint", function () {
  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/contacttags", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contacttags")
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

  describe("Create Method", function () {
    // case for empty,required and correct params for Create method done here
    describe("POST /crm-plugin/contacttags/", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/contacttags")
          .send({})
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });

      it("Correct params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/contacttags")
          .send({
            contact: {
              id: 6,
            },
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

  describe("FindOne Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/contacttags/:id", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contacttags")
          .send({
            id: 1,
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

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/contacttags/:id", function () {
      it("Updating params test case", function (done) {
        request(SERVER_URL)
          .put("/crm-plugin/contacttags/" + dataId)
          .send({
            contact: {
              id: 6,
            },
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
    describe("GET /crm-plugin/contacttags/count", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contacttags/count")
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
    describe("DELETE /crm-plugin/contacttags/:id", function () {
      it("Correct params test case", function (done) {
        request(SERVER_URL)
          .delete("/crm-plugin/contacttags/" + dataId)
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
