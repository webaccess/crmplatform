const fs = require("fs");
const path = require("path");
const directory = "../config/routes/";

async function generateRoutes(autoreload) {
  console.log("Generating Routes...");
  if (autoreload === false) {
    let allObj = { routes: [] };
    fs.readdirSync(path.resolve(__dirname, directory)).forEach((file) => {
      let rawdata = fs.readFileSync(path.resolve(__dirname, directory + file));
      let data = JSON.parse(rawdata);
      allObj.routes = allObj.routes.concat(data.routes);
    });
    await fs.writeFileSync(
      path.resolve(__dirname, "../config/routes.json"),
      JSON.stringify(allObj)
    );
  }
}
module.exports = {
  generateRoutes,
};
