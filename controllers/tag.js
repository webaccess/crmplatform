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

      await Promise.all(
        tag.map(async (entity) => {
          let contacts = [];
          if (entity.contacttags.length) {
            let contacttags = [];
            contacttags = entity.contacttags.map((contacttag) => {
              return contacttag.id;
            });
            if (contacttags.length)
              contacts = await strapi
                .query("contact", "crm-plugin")
                .find({ contacttags: contacttags });
            entity.contacts = contacts;
          }
        })
      );
      return tag.map((entity) => {
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["tag"],
        });
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },

  findOne: async (ctx) => {
    const { id } = ctx.params;
    try {
      const entity = await strapi.query("tag", "crm-plugin").findOne({ id });
      let contacts = [];
      if (entity.contacttags.length) {
        let contacttags = [];
        contacttags = entity.contacttags.map((contacttag) => {
          return contacttag.id;
        });
        if (contacttags.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ contacttags: contacttags });
        entity.contacts = contacts;
      }
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
        if (ctx.request.body.contacts) {
          var promise = await Promise.all(
            ctx.request.body.contacts.map(async (contact) => {
              let contacttagDetails = {
                tag: ctx.params.id,
                contact: contact,
              };
              const contacttagEntity = await strapi
                .query("contacttag", "crm-plugin")
                .findOne(contacttagDetails);
              if (contacttagEntity == null) {
                contacttagEntry = await strapi
                  .query("contacttag", "crm-plugin")
                  .create(contacttagDetails);
              } else {
                contacttagEntry = await strapi
                  .query("contacttag", "crm-plugin")
                  .update({ tag: ctx.params.id }, contacttagDetails);
              }
            })
          );
        }
        const { id } = ctx.params;
        entity = await strapi
          .query("tag", "crm-plugin")
          .update({ id }, ctx.request.body);
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
        if (ctx.request.body.contacts) {
          let contacttags = [];
          var promise = await Promise.all(
            ctx.request.body.contacts.map(async (contact) => {
              let contacttagDetails = {
                tag: entity.id,
                contact: contact,
              };
              contacttagEntry = await strapi
                .query("contacttag", "crm-plugin")
                .create(contacttagDetails);
              contacttags.push(contacttagEntry);
            })
          );
          entity.contacttags = contacttags;
        }
      }
      if (entity.contacttags.length) {
        let contacttags = [];
        let contacts = [];
        contacttags = entity.contacttags.map((contacttag) => {
          return contacttag.id;
        });
        if (contacttags.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ contacttags: contacttags });
        entity.contacts = contacts;
      }
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      });
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
