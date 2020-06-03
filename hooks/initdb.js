const fs = require("fs");
const path = require("path");
const _data = require("./data.js");
const bookshelf = require("./config.js");
var Promise = require("bluebird");
const apiFolder = "./api/";

function allStates() {
  return bookshelf
    .model("state")
    .fetchAll()
    .then((res) => res.toJSON());
}

const districts = _data.districts;

function addStatestoDistrict() {
  Object.keys(districts).forEach((district) => {
    bookshelf
      .model("state")
      .where("name", "=", districts[district]["state_name"])
      .fetch()
      .then((model) => {
        if (model) {
          const response = model.toJSON();
          // console.log(
          //   "getState in addStatestoDistrict",
          //   districts[district]["state_name"]
          // );
          districts[district]["master_state"] = response.id;
          // console.log("response.id", response.id);
        }
      });
  });
}

const states = _data.states;

var prom = new Promise(function (resolve, reject) {
  Object.keys(states).forEach((state) => {
    bookshelf
      .model("state")
      .fetchAll()
      .then(async function getAllStates(model) {
        const response = model.toJSON();
        const isStatePresent = response.find(
          (r) => r.name === states[state]["name"]
        );
        console.log("response in  state", response);
        if (!isStatePresent) {
          bookshelf
            .model("state")
            .forge({
              name: states[state]["name"],
              is_active: states[state]["is_active"],
            })
            .save()
            .then(addStatestoDistrict(), resolve());
        }
      })
      .catch((failed) => {
        reject({ failed });
      });
  });
});

prom.then(async function () {
  Object.keys(districts).forEach((district) => {
    bookshelf
      .model("district")
      .fetchAll()
      .then(async function getAllStates(model) {
        const response = model.toJSON();
        const isDistPresent = response.find(
          (r) => r.name === districts[district]["name"]
          // && r.master_state === districts[district]["master_state"]
        );
        // const state_id
        console.log("response in district", response);

        if (!isDistPresent) {
          // bookshelf.model("district").destroy;
          bookshelf
            .model("district")
            .forge({
              name: districts[district]["name"],
              is_active: districts[district]["is_active"],
              master_state: districts[district]["master_state"],
              // villages: states[state]["villages"],
            })
            .save()
            .then()
            .catch((error) => {
              console.log(error);
            });
        }
      });
  });
});
