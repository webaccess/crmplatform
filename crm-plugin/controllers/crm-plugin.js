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
    // let x = strapi.plugins["crm-plugin"].controllers["state"].find(ctx.query);
    // console.log("x", x);
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
  },

  create: async (ctx) => {
    let org;
    let contact;
    if (ctx.request.body.contact_type) {
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
    } else return { error: "contact_type parameter not found" };

    return sanitizeEntity(contact, {
      model: strapi.plugins["crm-plugin"].models.contact,
    });
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
