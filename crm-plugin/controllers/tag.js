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
      const entity = await strapi.query("tag", "crm-plugin").findOne({ id });
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
    try {
      if (ctx.params.id) {
        if (ctx.request.body.contact) {
          let contacttagDetails = {
            tag: ctx.params.id,
            contact: ctx.request.body.contact,
          };
          const contacttagEntity = await strapi
            .query("contacttag", "crm-plugin")
            .findOne(contacttagDetails);
          if (contacttagEntity == null) {
            console.log("case 1");
            contacttagEntry = await strapi
              .query("contacttag", "crm-plugin")
              .create(contacttagDetails);
          } else {
            console.log("case 2");
            contacttagEntry = await strapi
              .query("contacttag", "crm-plugin")
              .update({ tag: ctx.params.id }, contacttagDetails);
          }
        }
        const { id } = ctx.params;
        entity = await strapi
          .query("tag", "crm-plugin")
          .update({ id }, ctx.request.body);

        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["tag"],
        });
      } else {
        const reqVal = ["name"];
        const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
          ctx.request.body,
          reqVal
        );

        if (result.error == true) {
          return ctx.badRequest(null, result.message);
        }
        entity = await strapi
          .query("tag", "crm-plugin")
          .create(ctx.request.body);
        if (ctx.request.body.contact) {
          let contacttagDetails = {
            tag: entity.id,
            contact: ctx.request.body.contact,
          };
          contacttagEntry = await strapi
            .query("contacttag", "crm-plugin")
            .create(contacttagDetails);
          entity.contacttag = contacttagEntry.id;
        }
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["tag"],
        });
      }
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },

  delete: async (ctx) => {
    try {
      const entity = await strapi
        .query("contacttag", "crm-plugin")
        .delete({ tag: ctx.params.id });
      const { id } = ctx.params;
      const deleteTag = await strapi
        .query("tag", "crm-plugin")
        .delete(ctx.params);
      return sanitizeEntity(deleteTag, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },
};