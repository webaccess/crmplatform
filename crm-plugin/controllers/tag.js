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

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },

  find: async (ctx) => {
    let tag = await strapi.query("tag", "crm-plugin").find(ctx.query);
    return tag.map((entity) =>
      sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      })
    );
  },

  create: async (ctx) => {
    let entity;
    let contacttagEntry;
    try {
      if (ctx.params.id) {
        const { id } = ctx.params;
        entity = await strapi
          .query("tag", "crm-plugin")
          .update({ id }, ctx.request.body);
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["tag"],
        });
      } else {
        entity = await strapi
          .query("tag", "crm-plugin")
          .create(ctx.request.body);
           console.log("Body",ctx.request.body);
          if(ctx.request.body.contact){
            let contacttagDetails = {tag: entity.id, contact: ctx.request.body.contact}
           contacttagEntry = await strapi
          .query("contacttag", "crm-plugin")
          .create(contacttagDetails);  
          }
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["tag"],
        });
      }
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  },

  delete: async (ctx) => {
    let entity;
    let orgId = ctx.params;
    console.log("orgId", ctx.params);
      entity = await strapi.query("contacttag", "crm-plugin").delete({ tag:ctx.params.id });
    return sanitizeEntity(entity,{
      model: strapi.plugins["crm-plugin"].models["contacttag"],
    });
    const { id } = ctx.params;
    try {
      const entity = await strapi.query("tag", "crm-plugin").delete({ id });
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      });
    } catch (error) {
      console.error(error);
      return { error: error.message };
    } 
  }
};
