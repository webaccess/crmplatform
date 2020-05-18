const request = require("co-supertest");

const { getJWTToken, SERVER_URL } = require("../config/config");
let dataId;

// var promi = await getJWTToken();
// console.log("promi", promi);
var prom = getJWTToken().then(
  function (JWT) {
    try {
      console.log("jwt==", JWT);
      describe("States Module Endpoint", function () {
        console.log("states amod");
        describe("Find Method", function () {
          console.log("find amod");
          // case for empty params done here
          describe("GET /crm-plugin/states", function () {
            console.log("get amod");
            it("Empty params test case", function (done) {
              console.log("empty amod");
              request(SERVER_URL)
                .get("/crm-plugin/states")
                .set("Authorization", "Bearer " + JWT)
                .expect(200)
                .expect("Content-Type", /json/)
                .end(function (err, res) {
                  console.log("in states");
                  done(err);
                });
            });
          });
        });

        describe("Create Method", function () {
          // case for empty,required and correct params for Create method done here
          describe("POST /crm-plugin/states/", function () {
            it("Empty params test case", function (done) {
              request(SERVER_URL)
                .post("/crm-plugin/states")
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
                .post("/crm-plugin/states")
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
                .post("/crm-plugin/states")
                .send({
                  name: "Gujarat",
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
          describe("PUT /crm-plugin/states/:id", function () {
            it("Updating params test case", function (done) {
              request(SERVER_URL)
                .put("/crm-plugin/states/" + dataId)
                .send({
                  name: "Goa",
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
          describe("GET /crm-plugin/states/:id", function () {
            it("Empty params test case", function (done) {
              request(SERVER_URL)
                .get("/crm-plugin/states")
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

        describe("Count Method", function () {
          // case for count done here
          describe("GET /crm-plugin/states/count", function () {
            it("Empty params test case", function (done) {
              request(SERVER_URL)
                .get("/crm-plugin/states/count")
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
          describe("DELETE /crm-plugin/states/:id", function () {
            it("Correct params test case", function (done) {
              request(SERVER_URL)
                .delete("/crm-plugin/states/" + dataId)
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
    } catch (error) {
      console.log("err", error);
    }
  },
  function (err) {
    throw err;
  }
);
