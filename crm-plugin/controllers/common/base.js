"use strict";

/**
 * crm-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `crm-plugin` plugin.
 */
function Base() {
  /**
   * Default action.
   *
   * @return {Object}
   */
  this.getTable = (url) => {
    let urlArr = url.split("/");
    console.log("ctx", urlArr);
    let table = "";
    if (urlArr.length >= 3) table = urlArr[2];
    return table;
  };

  this.find = async (ctx) => {
    console.log("ctx", ctx);
    let table = this.getTable(ctx.originalUrl);
    console.log("table", table.splice(table.length));
    try {
      let state;
      if (ctx.query._q) {
        state = await strapi.query(table, "crm-plugin").search(ctx.query);
      } else {
        state = await strapi.query(table, "crm-plugin").find(ctx.query);
      }

      return state.map((entity) =>
        sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models[table],
        })
      );
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };
}
module.exports = Base;
