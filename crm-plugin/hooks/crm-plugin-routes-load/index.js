const fs = require("fs");
const path = require("path");
const directory = "../../config/routes/";

module.exports = (strapi) => {
  const hook = {
    /**
     * Default options
     */

    defaults: {
      // config object
    },

    /**
     * Initialize the hook
     */

    async initialize() {
      var autoreload = process.env.AUTORELOAD
        ? eval(process.env.AUTORELOAD)
        : true;
      if (autoreload === false) {
        let allObj = { routes: [] };
        fs.readdirSync(path.resolve(__dirname, directory)).forEach((file) => {
          console.log("file", file);
          let rawdata = fs.readFileSync(
            path.resolve(__dirname, directory + file)
          );
          let data = JSON.parse(rawdata);
          allObj.routes = allObj.routes.concat(data.routes);
        });
        await fs.writeFileSync(
          path.resolve(__dirname, "../../config/routes.json"),
          JSON.stringify(allObj)
        );
      }
    },
  };

  return hook;
};
