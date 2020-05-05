"use strict";

/**
 * crm-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `crm-plugin` plugin.
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  generateRoutes: async (ctx) => {
    // Add your own logic here.
    try {
      strapi.plugins["crm-plugin"].services.routes.generateRoutes(false);
      // Send 200 `ok`
      return ctx.send({
        error: false,
        message: "ok",
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },
};