const request = require("request");
const fs = require("fs");
const {
  SERVER_URL,
  USER_IDENTIFIER,
  USER_PASSWORD,
} = require("./config/config");
request.post(
  SERVER_URL + "/auth/local",
  {
    json: {
      identifier: USER_IDENTIFIER,
      password: USER_PASSWORD,
    },
  },
  (err, res, body) => {
    if (err) {
      console.log("err", err);
    }

    var JWT = body.jwt;

    fs.writeFile(
      "tests/integration/config/JWT.js",
      'const JWT="' + JWT + '"; module.exports = { JWT,};',
      function (err) {
        if (err) return console.log(err);
        console.log("file updated successfully!!");
      }
    );
  }
);
