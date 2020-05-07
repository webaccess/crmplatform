const request = require("co-supertest");

const { JWT, SERVER_URL } = require("../config/config");

describe("Tags Module Endpoint", function () {
  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/tags", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/tags")
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
    describe("GET /crm-plugin/tags/:id", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/tags")
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
    // case for empty,required and correct params for Create method done here
    describe("POST /crm-plugin/tags/", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/tags")
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
          .post("/crm-plugin/tags")
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
          .post("/crm-plugin/tags")
          .send({
            name: "Tag 1",
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
    describe("PUT /crm-plugin/tags/:id", function () {
      it("Updating params test case", function (done) {
        const id = 1;
        request(SERVER_URL)
          .put("/crm-plugin/tags/" + id)
          .send({
            name: "Tag 2",
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

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/tags/:id", function () {
      it("Correct params test case", function (done) {
        const id = 1;
        request(SERVER_URL)
          .delete("/crm-plugin/tags/" + id)
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
