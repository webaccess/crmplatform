const { bookshelf, Contact } = require("./config/config");
var Promise = require("bluebird");

let promise = new Promise((resolve, reject) => {
  resolve("done!");
});

//helper function
// async function getID(value) {
//   return await bookshelf
//     .model("contact")
//     .query(function (qb) {
//       qb.where("name", "=", value);
//     })
//     .fetchAll()
//     .then((res) => res.toJSON());
// }
function displayID() {
  let getID = Contact.where("name", "=", "Brand new").fetch({});
  Promise.all([promise, getID]).then(function (response) {
    var data = {
      promise: response[0],
      getID: response[1],
    };

    console.log("in to reponse:-", response, "data---", data.getID);

    // res.status(200).send(data);
  });
}
// displayID();
module.exports = {
  displayID,
};
