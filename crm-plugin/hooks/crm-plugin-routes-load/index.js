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
      var routes = await strapi.plugins[
        "crm-plugin"
      ].services.routes.generateRoutes(autoreload);
    },
  };

  return hook;
};
