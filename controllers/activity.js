"use strict";

/**
 * Activity
 *
 * API: Activity
 *
 * @description: Activity stores details about what the activity is and also tracks when the activity took place as well as information about that activity.
 */
const { sanitizeEntity } = require("strapi-utils");
module.exports = {
  /**
   * Method: find
   * Parameters:
   *    - Request object
   *      - Filters / Column attributes (Optional)
   * @description: This method returns all the activity details by default or specific activity details with certain conditions based on the filters passed to the method.
   */
  find: async (ctx) => {
    let activity;
    try {
      if (ctx.query._q) {
        activity = await strapi
          .query("activity", "crm-plugin")
          .search(ctx.query);
      } else {
        activity = await strapi.query("activity", "crm-plugin").find(ctx.query);
      }
      await Promise.all(
        activity.map(async (entity) => {
          let contacts = [];
          if (entity.activityassignees.length) {
            let activityassignees = [];
            activityassignees = entity.activityassignees.map(
              (activityassignee) => {
                return activityassignee.id;
              }
            );
            if (activityassignees.length)
              contacts = await strapi
                .query("activity", "crm-plugin")
                .find({ activityassignees: activityassignees });
            entity.contacts = contacts;
          }
        })
      );
      return activity.map((entity) =>
        sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["activity"],
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
   *      - id - identifier of activity table
   * @description: This method returns specific activity details by id.
   */
  findOne: async (ctx) => {
    const { id } = ctx.params;
    try {
      const entity = await strapi
        .query("activity", "crm-plugin")
        .findOne({ id });
      let contacts = [];
      if (entity.activityassignees.length) {
        let activityassignees = [];
        activityassignees = entity.activityassignees.map((activityassignee) => {
          return activityassignee.id;
        });
        if (activityassignees.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ activityassignees: activityassignees });
        entity.contacts = contacts;
      }
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
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
   *      - title - name of the activity
   *      - Column attributes (Optional)
   * @description: This method creates an activity with the attribute parameters passed to this method by default. It returns details of created activity.
   */
  create: async (ctx) => {
    let activityassignee;
    let activity;

    try {
      const reqVal = ["title"];
      const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
        ctx.request.body,
        reqVal
      );
      if (result.error == true) {
        return ctx.send(result.message);
      }
      // creates an entry into activity table when required params are passed
      activity = await strapi
        .query("activity", "crm-plugin")
        .create(ctx.request.body);
      if (ctx.request.body.contacts) {
        let activityassignees = [];
      // creates an entry into activityassignee table with activity and contact id
      var promise = await Promise.all(
          ctx.request.body.contacts.map(async (contact) => {
            let activityDetail = {
              activity: activity.id,
              contact: contact,
            };
            activityassignee = await strapi
              .query("activityassignee", "crm-plugin")
              .create(activityDetail);
            activityassignees.push(activityassignee);
          })
        );
        activity.activityassignees = activityassignees;
      }
      if (activity.activityassignees.length) {
        let activityassignees = [];
        let contacts = [];
        activityassignees = activity.activityassignees.map(
          (activityassignee) => {
            return activityassignee.id;
          }
        );
        if (activityassignees.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ activityassignees: activityassignees });
        activity.contacts = contacts;
      }
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
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
   *      - id - identifier of activity table
   *      - Column attributes
   * @description: This method updates the specific activity by id with attribute parameters passed to it.It returns details of updated activity.
   */
  update: async (ctx) => {
    let activityassignee;
    let activity;
    try {
      if (ctx.request.body.contacts) {
        var promise = await Promise.all(
          ctx.request.body.contacts.map(async (contact) => {
            let activityDetail = {
              activity: ctx.params.id,
              contact: contact,
            };
            // updates activityassignee table according to passed id
            const assigneeQuery = await strapi
              .query("activityassignee", "crm-plugin")
              .findOne(activityDetail);
            if (assigneeQuery == null) {
              activityassignee = await strapi
                .query("activityassignee", "crm-plugin")
                .create(activityDetail);
            } else {
              activityassignee = await strapi
                .query("activityassignee", "crm-plugin")
                .update({ activity: ctx.params.id }, activityDetail);
            }
          })
        );
      }
       // updates activity details according to parameters passed for particular id
      const { id } = ctx.params;
      activity = await strapi
        .query("activity", "crm-plugin")
        .update({ id }, ctx.request.body);
      if (activity.activityassignees.length) {
        let activityassignees = [];
        let contacts = [];
        activityassignees = activity.activityassignees.map(
          (activityassignee) => {
            return activityassignee.id;
          }
        );
        if (activityassignees.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ activityassignees: activityassignees });
        activity.contacts = contacts;
      }
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
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
   *      - id - identifier of activity table
   * @description: This method deletes specific activity by id and returns details of deleted activity.
   */
  delete: async (ctx) => {
    try {
      // delete activity details from activityassignee
      const activityassign = await strapi
        .query("activityassignee", "crm-plugin")
        .delete({ activity: ctx.params.id });
      // delete activity details of passed id
      const activity = await strapi
        .query("activity", "crm-plugin")
        .delete(ctx.params);
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },
};
