const request = require("co-supertest");

const { getJWTToken, SERVER_URL } = require("../config/config");
let dataId;

var prom = getJWTToken().then(function (JWT) {
  describe("Activityassignee Module Endpoint", function () {
    describe("Find Method", function () {
      // case for empty params done here
      describe("GET /crm-plugin/activityassignees", function () {
        it("Empty params test case", function (done) {
          request(SERVER_URL)
            .get("/crm-plugin/activityassignees")
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
      describe("POST /crm-plugin/activityassignees/", function () {
        it("Empty params test case", function (done) {
          request(SERVER_URL)
            .post("/crm-plugin/activityassignees")
            .send({})
            .set("Authorization", "Bearer " + JWT)
            .expect(400)
            .expect("Content-Type", /json/)
            .end(function (err, res) {
              done(err);
            });
        });

        it("Correct params test case", function (done) {
          request(SERVER_URL)
            .post("/crm-plugin/activityassignees")
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
              done(err);
            });
        });
      });
    });

    describe("FindOne Method", function () {
      // case for empty params done here
      describe("GET /crm-plugin/activityassignees/:id", function () {
        it("Empty params test case", function (done) {
          request(SERVER_URL)
            .get("/crm-plugin/activityassignees")
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

    describe("Update Method", function () {
      // case for correct params done for update method
      describe("PUT /crm-plugin/activityassignees/:id", function () {
        it("Updating params test case", function (done) {
          request(SERVER_URL)
            .put("/crm-plugin/activityassignees/" + dataId)
            .send({
              contact: {
                id: 7,
              },
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

    describe("Count Method", function () {
      // case for count done here
      describe("GET /crm-plugin/activityassignees/count", function () {
        it("Empty params test case", function (done) {
          request(SERVER_URL)
            .get("/crm-plugin/activityassignees/count")
            .set("Authorization", "Bearer " + JWT)
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .end(function (err, res) {
              done(err);
            });
        });
      });
    });

    describe("Delete Method", function () {
      // case for correct params done here
      describe("DELETE /crm-plugin/activityassignees/:id", function () {
        it("Correct params test case", function (done) {
          request(SERVER_URL)
            .delete("/crm-plugin/activityassignees/" + dataId)
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
});
