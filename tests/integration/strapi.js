const Strapi = require("strapi");
const http = require("http");

let instance;

async function setupStrapi() {
  if (!instance) {
    let directory = process.cwd();
    let StrapiDir = directory.split("/").slice(0,-2).join("/")
    await Strapi({dir:StrapiDir}).load()
    .then(async function(response) {
      instance = strapi; // strapi is global now
      await instance.app
        .use(instance.router.routes()) // populate KOA routes
        .use(instance.router.allowedMethods()); // populate KOA methods
      instance.server = http.createServer(instance.app.callback());
      return instance;
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
}
module.exports = { setupStrapi };
