"use strict";

/**
 * Tag
 *
 * API: Tag
 *
 * ctx: Context object contains request parameters
 *
 * @description: Tag allows you to categorize the contacts.
 */
const { sanitizeEntity } = require("strapi-utils"); // removes private fields and its relations from model

module.exports = {
  /**
   * Method: find
   * Parameters:
   *    - Request object
   *      - Filters / Column attributes (Optional)
   * @description: This method returns all the tag details by default or specific tag details based on the filters passed to the method.
   */
  find: async (ctx) => {
    try {
      let tag;
      // ctx.query._q: filter parameters in context object
      if (ctx.query._q) {
        // checks if any filter parameter is present
        tag = await strapi.query("tag", "crm-plugin").search(ctx.query);
      } else {
        // returns all data if no filter parameter is passed
        tag = await strapi.query("tag", "crm-plugin").find(ctx.query);
      }

      await Promise.all(
        tag.map(async (entity) => {
          let contacts = [];
          // checks whether the tag obj has contact tags
          if (entity.contacttags.length) {
            let contactTags = [];
            contactTags = entity.contacttags.map((contactTag) => {
              return contactTag.id;
            });
            // if contact tags are present, find their associated contacts
            if (contactTags.length) {
              contacts = await strapi
                .query("contact", "crm-plugin")
                .find({ contacttags: contactTags });
            }
            entity.contacts = contacts;
          }
        })
      );

      // returns final tag obj
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
   *      - id: identifier of tag table
   * @description: This method returns specific tag details based on the id passed.
   */
  findOne: async (ctx) => {
    const { id } = ctx.params; // get id from context object
    try {
      // get tag obj of that passed id
      const entity = await strapi.query("tag", "crm-plugin").findOne({ id });
      let contacts = [];

      // checks whether the tag obj has contact tags
      if (entity.contacttags.length) {
        let contactTags = [];
        contactTags = entity.contacttags.map((contactTag) => {
          return contactTag.id;
        });

        // finds corresponding contacts for each contact tag
        if (contactTags.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ contacttags: contactTags });
        entity.contacts = contacts;
      }

      // returns final tag obj
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
   *      - name: name of the tag
   *      - is_active: active status of tag (Boolean value : true or false)
   *      - contact: Array of contact tag (an organization or individual) ids (Optional)
   *      - Column attributes (Optional)
   * @description: This method creates a tag with the attribute parameters passed to this method by default. It returns details of the created tag.
   */
  create: async (ctx) => {
    let entity;
    let contactTagEntry;

    try {
      const reqVal = ["name"];

      // checks for required params/empty params passed or not
      const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
        ctx.request.body,
        reqVal
      );
      // returns error message if required params not found/ empty params passed
      if (result.error == true) {
        return ctx.send(result.message);
      }

      // creates an entry into tag table
      entity = await strapi.query("tag", "crm-plugin").create(ctx.request.body);

      if (ctx.request.body.contacts) {
        let contactTags = [];
        // links contact tags with the tag
        var promise = await Promise.all(
          ctx.request.body.contacts.map(async (contact) => {
            let contactTagDetails = {
              tag: entity.id,
              contact: contact,
            };
            contactTagEntry = await strapi
              .query("contacttag", "crm-plugin")
              .create(contactTagDetails);

            contactTags.push(contactTagEntry);
          })
        );
        entity.contacttags = contactTags;
      }

      // checks whether the tag obj has contact tags
      if (entity.contacttags.length) {
        let contactTags = [];
        let contacts = [];
        contactTags = entity.contacttags.map((contactTag) => {
          return contactTag.id;
        });

        // finds corresponding contacts for each contact tag
        if (contactTags.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ contacttags: contactTags });
        entity.contacts = contacts;
      }

      // returns created tag obj
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
   *      - id: identifier of tag table
   *      - Column attributes
   * @description: This method updates the specific tag based on the id with attribute parameters passed to it. It returns details of the updated tag.
   */
  update: async (ctx) => {
    let entity;
    let contactTagEntry;
    try {
      if (ctx.request.body.contacts) {
        // updates respective contact tag if exists, otherwise create new entry
        var promise = await Promise.all(
          ctx.request.body.contacts.map(async (contact) => {
            let contactTagDetails = {
              tag: ctx.params.id,
              contact: contact,
            };
            const contactTagEntity = await strapi
              .query("contacttag", "crm-plugin")
              .findOne(contactTagDetails);
            if (contactTagEntity == null) {
              contactTagEntry = await strapi
                .query("contacttag", "crm-plugin")
                .create(contactTagDetails);
            } else {
              contactTagEntry = await strapi
                .query("contacttag", "crm-plugin")
                .update({ tag: ctx.params.id }, contactTagDetails);
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
        let contactTags = [];
        let contacts = [];
        contactTags = entity.contacttags.map((contactTag) => {
          return contactTag.id;
        });
        if (contactTags.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ contacttags: contactTags });
        entity.contacts = contacts;
      }

      // returns updated tag obj
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
   *      - id: identifier of tag table
   * @description: This method deletes specific tag based on the id passed and returns details of the deleted tag.
   */
  delete: async (ctx) => {
    try {
      // deletes contact tag details of respective activity id
      const entity = await strapi
        .query("contacttag", "crm-plugin")
        .delete({ tag: ctx.params.id });

      // deletes entire tag obj
      const deleteTag = await strapi
        .query("tag", "crm-plugin")
        .delete(ctx.params);

      // returns deleted activity obj
      return sanitizeEntity(deleteTag, {
        model: strapi.plugins["crm-plugin"].models["tag"],
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },
};
