"use strict";
/**
 * crm-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `crm-plugin` plugin.
 */
const { sanitizeEntity } = require("strapi-utils");
const vm = require("vm");
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
      let contact;
      if (ctx.query._q) {
        contact = await strapi.query("contact", "crm-plugin").search(ctx.query);
      } else {
        contact = await strapi.query("contact", "crm-plugin").find(ctx.query);
      }

      return contact.map((entity) =>
        sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["contact"],
        })
      );
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },

  findOne: async (ctx) => {
    const findOneParams = ["id"];
    const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
      ctx.params,
      findOneParams
    );
    try {
      if (!result.error) {
        const { id } = ctx.params;
        const entity = await strapi
          .query("contact", "crm-plugin")
          .findOne({ id });
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["contact"],
        });
      } else {
        if (result.error) {
          return ctx.badRequest(null, result.message);
        }
      }
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },

  create: async (ctx) => {
    let org;
    let contact;
    try {
      if (ctx.params.id) {
        let contactDetails = {};
        contactDetails["contact"] = ctx.params.id;
        org = await strapi
          .query(ctx.request.body.contact_type, "crm-plugin")
          .update(contactDetails, ctx.request.body);

        // update contact
        contact = await strapi
          .query("contact", "crm-plugin")
          .update(ctx.params, ctx.request.body);
      } else {
        const requiredValues = ["name", "contact_type"];
        const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
          ctx.request.body,
          requiredValues
        );
        if (result.error == true) {
          return ctx.badRequest(null, result.message);
        }
        //create org
        org = await strapi
          .query(ctx.request.body.contact_type, "crm-plugin")
          .create(ctx.request.body);

        let orgOtherDetails = {};
        orgOtherDetails[ctx.request.body.contact_type] = org.id;

        //create org
        let orgDetails = Object.assign(orgOtherDetails, ctx.request.body);
        // create contact
        contact = await strapi
          .query("contact", "crm-plugin")
          .create(orgDetails);
      }

      return sanitizeEntity(contact, {
        model: strapi.plugins["crm-plugin"].models.contact,
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },

  delete: async (ctx) => {
    try {
      const contact = await strapi
        .query("contact", "crm-plugin")
        .delete(ctx.params);

      let orgId = contact.individual
        ? contact.individual.id
        : contact.organization
        ? contact.organization.id
        : "";
      if (orgId)
        await strapi
          .query(contact.contact_type, "crm-plugin")
          .delete({ id: orgId });
      await strapi
        .query("contacttag", "crm-plugin")
        .delete({ contact: ctx.params.id });
      return sanitizeEntity(contact, {
        model: strapi.plugins["crm-plugin"].models.contact,
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },
};
