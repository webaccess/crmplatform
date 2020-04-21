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
    let contactID;
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
          if(ctx.request.body.contact){
            let tagID = {tag: entity.id}
            let contactID = {contact: 1}
            console.log("Results aya",contactID)
           contacttagEntry = await strapi
          .query("contacttag", "crm-plugin")
          .create(contactID);  
          console.log("contacttag entry", contacttagEntry)
          }
        
          // console.log("Results aya",entity)
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["contacttag"],

        });

      }

    } catch (error) {
      console.error(error);
      return { error: error.message };
    }

    // if(){

    // }  
  },

  delete: async (ctx) => {
    const contact = await strapi
      .query("contact", "crm-plugin")
      .delete(ctx.params);

    let orgId = contact.individual
      ? contact.individual.id
      : contact.organization
      ? contact.organization.id
      : "";
    console.log("orgId", orgId);
    if (orgId)
      await strapi
        .query(contact.contact_type, "crm-plugin")
        .delete({ id: orgId });
    return sanitizeEntity(contact, {
      model: strapi.plugins["crm-plugin"].models.contact,
    });
  },
};
