const data = require("../config/config");
const bookshelf = data.bookshelf;

//helper function
async function getID(value) {
  return await bookshelf
    .model("contact")
    .query(function (qb) {
      qb.where("name", "=", value);
    })
    .fetchAll()
    .then((res) => res.toJSON());
}

module.exports = {
  getID,
};