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
  try {
     let tag;
     if (ctx.query._q) {
        tag = await strapi.query("tag", "crm-plugin").search(ctx.query);
      } else {
        tag = await strapi.query("tag", "crm-plugin").find(ctx.query);
      }

    return tag.map((entity) =>
      sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      })
    );
      } catch (error) {
      console.error(error);
     return ctx.badRequest(null, error.message);
    }
  },

   findOne: async (ctx) => {
    const { id } = ctx.params;
    try {
      const entity = await strapi
        .query("tag", "crm-plugin")
        .findOne({ id });
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },

  create: async (ctx) => {
    let entity;
    let contacttagEntry;
    if (result.error == "false") {
    try {
      if (ctx.params.id) {
         if(ctx.request.body.contact){
            let contacttagDetails = {tag: ctx.params.id, contact: ctx.request.body.contact}
             console.log("contacttagDetails",contacttagDetails)
            contacttagEntry = await strapi
            .query("contacttag", "crm-plugin")
            .update({ tag:ctx.params.id },contacttagDetails);  
          }
          const { id } = ctx.params;
          entity = await strapi
            .query("tag", "crm-plugin")
            .update({ id }, ctx.request.body);
           
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["tag"],
        });
      } else {
        const reqVal = ["name","is_active"];
        const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
          ctx.request.body,
          reqVal
        );
        console.log("result",result)
        if (result.error == true) {
          return ctx.badRequest(null, result.message);
        }
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
          console.log("jhsdhjdsfdhfj",contacttagEntry)
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["tag"],
        });
      }
    } catch (error) {
      console.error(error);
       return ctx.badRequest(null, error.message);
    }
  }else{
    return result.message
  }
  },

  delete: async (ctx) => {
    let entity;
    let orgId = ctx.params;
    console.log("orgId", ctx.params);
      entity = await strapi.query("contacttag", "crm-plugin").delete({ tag:ctx.params.id });
    return sanitizeEntity(entity,{
      model: strapi.plugins["crm-plugin"].models["tag"],
    });
    const { id } = ctx.params;
    try {
      const entity = await strapi.query("tag", "crm-plugin").delete({ id });
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      });
    } catch (error) {
      console.error(error);
     return ctx.badRequest(null, error.message);
    } 
  }
};
