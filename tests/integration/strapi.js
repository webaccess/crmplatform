const Strapi = require("strapi");
const http = require("http");

let instance;

async function setupStrapi() {
  if (!instance) {
    console.log("process.cwd()",process.cwd());
    let Dir = process.cwd();
    let directory = Dir.splice
    console.log("directory", directory);
    /** the follwing code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi({dir:"../../"}).load()
    .then(async function(response) {
      instance = strapi; // strapi is global now
      // console.log("Instance of Strapi -----",instance)
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
