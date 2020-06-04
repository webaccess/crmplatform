"use strict";

/**
 * Tag
 *
 * API: Tag
 *
 * @description: Tag allows you to categorize the contacts.
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Method: find
   * Parameters:
   *    - Request object
   *      - Filters / Column attributes (Optional)
   * @description: This method returns all the tag details by default or specific tag details with certain conditions based on the filters passed to the method.
   */
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

  /**
   * Method: findOne
   * Parameters:
   *    - Request object
   *      - id - identifier of tag table
   * @description: This method returns specific tag details by id.
   */
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

  /**
   * Method: create
   * Parameters:
   *    - Request object
   *      - name - name of the tag
   *      - is_active - active status of tag (Boolean value : true or false)
   *      - Column attributes (Optional)
   * @description: This method creates a tag with the attribute parameters passed to this method by default.
   */
  create: async (ctx) => {
    let entity;
    let contacttagEntry;
    try {
      const reqVal = ["name"];
      const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
        ctx.request.body,
        reqVal
      );
      if (result.error == true) {
        return ctx.send(result.message);
      }
      // creates an entry into tag table when required params are passed
      entity = await strapi.query("tag", "crm-plugin").create(ctx.request.body);
      if (ctx.request.body.contacts) {
        let contacttags = [];
        // Links contacttag with the tag
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

  /**
   * Method: update
   * Parameters:
   *    - Request object
   *      - id - identifier of tag table
   *      - Column attributes
   * @description: This method updates the specific tag by id with attribute parameters passed to it.It returns details of updated tag.
   */
  update: async (ctx) => {
    let entity;
    let contacttagEntry;
    try {
      if (ctx.request.body.contacts) {
        var promise = await Promise.all(
          ctx.request.body.contacts.map(async (contact) => {
            let contacttagDetails = {
              tag: ctx.params.id,
              contact: contact,
            };
            // updates contacttag table according to passed id
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
      // updates activity details for particular id according to parameters passed
      const { id } = ctx.params;
      entity = await strapi
        .query("tag", "crm-plugin")
        .update({ id }, ctx.request.body);
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

  /**
   * Method: delete
   * Parameters:
   *    - Request object
   *      - id - identifier of tag table
   * @description: This method deletes specific tag by id and returns details of deleted tag.
   */
  delete: async (ctx) => {
    try {
      // delete tag details from contacttag
      const entity = await strapi
        .query("contacttag", "crm-plugin")
        .delete({ tag: ctx.params.id });
      const { id } = ctx.params;
      // delete tag details of passed id
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
