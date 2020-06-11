"use strict";

/**
 * Contact
 *
 * API: Contact
 *
 * ctx: Context object contains request parameters
 *
 * @description: Contact stores contact details like address, email, phone, etc of an individual or an organization or of a user in the system.
 */
const { sanitizeEntity } = require("strapi-utils"); // removes private fields and its relations from model
const vm = require("vm");
module.exports = {
  /**
   * Method: find
   * Parameters:
   *    - Request object
   *      - Filters / Column attributes (Optional)
   * @description: This method returns all the contact details by default or specific contact details based on the filters passed to the method.
   */
  find: async (ctx) => {
    try {
      // ctx.query._q: filter parameters in context object
      let contact;
      if (ctx.query._q) {
        // checks if any filter parameter is present
        contact = await strapi.query("contact", "crm-plugin").search(ctx.query);
      } else {
        // returns all data if no filter parameter is passed
        contact = await strapi.query("contact", "crm-plugin").find(ctx.query);
      }
      return contact.map((entity) =>
        sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["contact"],
        })
      );
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },

  /**
   * Method: findOne
   * Parameters:
   *    - Request object
   *      - id - identifier of contact table
   * @description: This method returns specific contact details based on the id passed.
   */
  findOne: async (ctx) => {
    const { id } = ctx.params; // get id from context object
    try {
      const entity = await strapi
        .query("contact", "crm-plugin")
        .findOne({ id });
      // returns contact obj
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["contact"],
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },

  /**
   * Method: create
   * Parameters:
   *    - Request object
   *      - name - name of the individual or organization or user in the system
   *      - contact_type - type of contact (values : organization/individual)
   *      - Column attributes (Optional)
   * @description: This method creates a contact with the attribute parameters passed to this method by default. It returns details of the created contact.
   */
  create: async (ctx) => {
    let org;
    let contact;
    try {
      const requiredValues = ["name", "contact_type"];
      const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
        ctx.request.body,
        requiredValues
      );
      // returns error message if required params not found/ empty params passed
      if (result.error == true) {
        return ctx.send(result.message);
      }
      // creates an entry in respective contact type(individual or organization) table
      org = await strapi
        .query(ctx.request.body.contact_type, "crm-plugin")
        .create(ctx.request.body);

      // gets contact type id from resp. table
      let orgOtherDetails = {};
      orgOtherDetails[ctx.request.body.contact_type] = org.id;
      // links contact type with the contact
      let orgDetails = Object.assign(orgOtherDetails, ctx.request.body);
      // creates an entry in contact table
      contact = await strapi.query("contact", "crm-plugin").create(orgDetails);
      // returns created contact obj
      return sanitizeEntity(contact, {
        model: strapi.plugins["crm-plugin"].models.contact,
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },

  /**
   * Method: update
   * Parameters:
   *    - Request object
   *      - id - identifier of contact table
   *      - Column attributes
   * @description: This method updates the specific contact based on the id with attribute parameters passed to it. It returns details of the updated contact.
   */
  update: async (ctx) => {
    let org;
    let contact;
    try {
      let contactDetails = {};
      contactDetails["contact"] = ctx.params.id;
      // updates organization/individual record corresponding to the passed id
      org = await strapi
        .query(ctx.request.body.contact_type, "crm-plugin")
        .update(contactDetails, ctx.request.body);
      // updates contact details for particular id according to parameters passed
      contact = await strapi
        .query("contact", "crm-plugin")
        .update(ctx.params, ctx.request.body);
      // return updated contact obj
      return sanitizeEntity(contact, {
        model: strapi.plugins["crm-plugin"].models.contact,
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },

  /**
   * Method: delete
   * Parameters:
   *    - Request object
   *      - id - identifier of contact table
   * @description: This method deletes specific contact based on the id passed and returns details of the deleted contact.
   */
  delete: async (ctx) => {
    try {
      const contact = await strapi
        .query("contact", "crm-plugin")
        .delete(ctx.params);
      // gets contact type id of respetcive contact
      let orgId = contact.individual
        ? contact.individual.id
        : contact.organization
        ? contact.organization.id
        : "";
      // if contact type exists, it is deleted
      if (orgId)
        await strapi
          .query(contact.contact_type, "crm-plugin")
          .delete({ id: orgId });
      await strapi
        .query("contacttag", "crm-plugin")
        .delete({ contact: ctx.params.id });
      // deletes contact obj based on id passed
      await strapi
        .query("activityassignee", "crm-plugin")
        .delete({ contact: ctx.params.id });
      // returns deleted contact obj
      return sanitizeEntity(contact, {
        model: strapi.plugins["crm-plugin"].models.contact,
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },
};
