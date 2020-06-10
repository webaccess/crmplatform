const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "", // add your db password
    database: "", // add your db name
  },
});

const bookshelf = require("bookshelf")(knex);

bookshelf.model("state", {
  requireFetch: false,
  tableName: "states",
  district() {
    return this.hasMany("district", "state", "id");
  },
});

bookshelf.model("district", {
  requireFetch: false,
  tableName: "districts",
  state() {
    return this.belongsTo("state", "state", "id");
  },
});

module.exports = bookshelf;
