"use strict";
/**
 * Controller: Contact
 *
 * @description: Contact content type stores contact details like address, email, phone, etc of an individual or an organization or a user in the system.
 */

const { sanitizeEntity } = require("strapi-utils");
const vm = require("vm");
module.exports = {
  /**
   * Method: find
   * Parameters:
   *    - Request object
   *      - Filters / Column attributes (Optional)
   * @description: This method returns all the contact details by default or specific contact details with certain conditions based on the filters passed to the method.
   */
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

  /**
   * Method: findOne
   * Parameters:
   *    - Request object
   *      - id - identifier of contact table
   * @description: This method returns specific contact details by id.
   */
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

  /**
   * Method: create
   * Parameters:
   *    - Request object
   *      - name - name of the individual or organization or user in the system
   *      - contact_type - type of contact (values : organization/individual)
   *      - id - identifier of contact table (Optional)
   *      - Column attributes (Optional)
   * @description: This method creates a contact with the parameters and other table column attributes passed to this method by default. If the id parameter is passed to this method, it updates the specific contact by id with attribute parameters passed to it.It returns details of created/updated contact.
   */
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
          return ctx.send(result.message);
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

  /**
   * Method: delete
   * Parameters:
   *    - Request object
   *      - id - identifier of contact table
   * @description: This method deletes specific contact by id and returns details of deleted contact.
   */
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
      await strapi
        .query("activityassignee", "crm-plugin")
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
