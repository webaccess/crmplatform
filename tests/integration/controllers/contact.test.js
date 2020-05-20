const request = require("co-supertest");

const { SERVER_URL, PAYLOAD } = require("../config/config");
let JWT;
let dataId;

describe("Contact Module Endpoint", function () {
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

  describe("Find Method", function () {
    // case for empty params done here
    describe("GET /crm-plugin/contact", function () {
      it("responds with all records when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contact")
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
    describe("POST /crm-plugin/contact/", function () {
      it("should not create an entry when empty params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/contact")
          .send({})
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });

      it("should not create an entry when required params test case is executed", function (done) {
        request(SERVER_URL)
          .post("/crm-plugin/contact")
          .send({
            is_active: true,
          })
          .set("Authorization", "Bearer " + JWT)
          .expect(200)
          .expect("Content-Type", "text/plain; charset=utf-8")
          .end(function (err, res) {
            if (err) done(err);
            else done();
          });
      });

      it("should create an entry when correct params test case is executed", function (done) {
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
            if (err) done(err);
            else done();
          });
      });
    });
  });

  describe("Update Method", function () {
    // case for correct params done for update method
    describe("PUT /crm-plugin/contact/:id", function () {
      it("should update the data when correct params test case is executed", function (done) {
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
    // case for correct params done here
    describe("GET /crm-plugin/contact/:id", function () {
      it("responds with matching records when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .get("/crm-plugin/contact")
          .send({
            id: dataId,
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

  describe("Delete Method", function () {
    // case for correct params done here
    describe("DELETE /crm-plugin/contact/:id", function () {
      it("should delete entry when correct params test case is executed", function (done) {
        request(SERVER_URL)
          .delete("/crm-plugin/contact/" + dataId)
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
