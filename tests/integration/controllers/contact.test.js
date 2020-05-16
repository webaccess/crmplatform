const request = require("co-supertest");

const { JWT, SERVER_URL } = require("../config/config");
let dataId;

describe("Contact Module Endpoint", function () {
  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/contact", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contact")
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
    describe("POST /crm-plugin/contact/", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/contact")
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
          .post("/crm-plugin/contact")
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
          .post("/crm-plugin/contact")
          .send({
            name: "Tech Providers",
            contact_type: "organization",
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            dataId = res.body.id;
            done(err);
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/contact/:id", function () {
      it("Updating params test case", function (done) {
        request(SERVER_URL)
          .put("/crm-plugin/contact/" + dataId)
          .send({
            name: "NewTech",
            contact_type: "organization",
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

  describe("FindOne Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/contact/:id", function () {
      it("Empty params test case", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contact")
          .send({
            id: dataId,
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
    describe("DELETE /crm-plugin/contact/:id", function () {
      it("Correct params test case", function (done) {
        request(SERVER_URL)
          .delete("/crm-plugin/contact/" + dataId)
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
