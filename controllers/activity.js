"use strict";

/**
 * Activity
 *
 * API: Activity
 *
 * ctx: Context object contains request parameters
 *
 * @description: Activity stores the details about the activity such as title, date and time and description.
 *
 */
const { sanitizeEntity } = require("strapi-utils"); // removes private fields and its relations from model

module.exports = {
  /**
   * Method: find
   * Parameters:
   *    - Request object
   *      - Filters / Column attributes (Optional)
   * @description: This method returns all the activity details by default or specific activity details based on the filters passed to the method.
   */
  find: async (ctx) => {
    let activity;
    try {
      // ctx.query._q: filter parameters in context object
      if (ctx.query._q) {
        // checks if any filter parameter is present
        activity = await strapi
          .query("activity", "crm-plugin")
          .search(ctx.query);
      } else {
        // returns all data if no filter parameter is passed
        activity = await strapi.query("activity", "crm-plugin").find(ctx.query);
      }

      await Promise.all(
        activity.map(async (entity) => {
          let contacts = [];
          // checks whether the activity obj has activity assignee
          if (entity.activityassignees.length) {
            let activityAssignees = [];
            activityAssignees = entity.activityassignees.map(
              (activityAssignee) => {
                return activityAssignee.id;
              }
            );
            // finds corresponding contacts for each activity assignee
            if (activityAssignees.length)
              contacts = await strapi
                .query("contact", "crm-plugin")
                .find({ activityassignees: activityAssignees });
            entity.contacts = contacts;
          }
        })
      );

      // returns final activity obj
      return activity.map((entity) =>
        sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["activity"],
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
   *     - id: identifier of activity table
   * @description: This method returns specific activity details based on the id passed.
   */
  findOne: async (ctx) => {
    const { id } = ctx.params; // get id from context object
    try {
      // get activity obj of that passed id
      const entity = await strapi
        .query("activity", "crm-plugin")
        .findOne({ id });

      let contacts = [];

      // checks whether the activity obj has activity assignee
      if (entity.activityassignees.length) {
        let activityAssignees = [];
        activityAssignees = entity.activityassignees.map((activityAssignee) => {
          return activityAssignee.id;
        });

        // finds corresponding contacts for each activity assignee
        if (activityAssignees.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ activityassignees: activityAssignees });
        entity.contacts = contacts;
      }

      // returns final activity obj
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },

  /**
   * Method: create
   * Parameters:
   *    - Request object
   *      - title: name of the activity
   *      - contact: Array of activity assignee (an organization or individual) ids (Optional)
   *      - Column attributes (Optional)
   * @description: This method creates an activity with the attribute parameters passed to this method by default. It returns details of the created activity.
   */
  create: async (ctx) => {
    let activityAssignee;
    let activity;

    try {
      const reqVal = ["title"];

      // checks for required params/empty params passed or not
      const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
        ctx.request.body,
        reqVal
      );
      // returns error message if required params not found/ empty params passed
      if (result.error == true) {
        return ctx.send(result.message);
      }

      // creates an entry into activity table
      activity = await strapi
        .query("activity", "crm-plugin")
        .create(ctx.request.body);

      if (ctx.request.body.contacts) {
        let activityAssignees = [];
        // links activity assignee with the activity
        var promise = await Promise.all(
          ctx.request.body.contacts.map(async (contact) => {
            let activityDetail = {
              activity: activity.id,
              contact: contact,
            };
            activityAssignee = await strapi
              .query("activityassignee", "crm-plugin")
              .create(activityDetail);

            activityAssignees.push(activityAssignee);
          })
        );
        activity.activityassignees = activityAssignees;
      }

      // checks whether the activity obj has activity assignee
      if (activity.activityassignees.length) {
        let activityAssignees = [];
        let contacts = [];
        activityAssignees = activity.activityassignees.map(
          (activityAssignee) => {
            return activityAssignee.id;
          }
        );

        // finds corresponding contacts for each activity assignee
        if (activityAssignees.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ activityassignees: activityAssignees });
        activity.contacts = contacts;
      }

      // returns created activity obj
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },

  /**
   * Method: update
   * Parameters:
   *    - Request object
   *      - id: identifier of activity table
   *      - Column attributes
   * @description: This method updates the specific activity based on the id with attribute parameters passed to it. It returns details of the updated activity.
   */
  update: async (ctx) => {
    let activityAssignee;
    let activity;
    try {
      if (ctx.request.body.contacts) {
        // updates respective activity assignee if exists, otherwise create new entry
        var promise = await Promise.all(
          ctx.request.body.contacts.map(async (contact) => {
            let activityDetail = {
              activity: ctx.params.id,
              contact: contact,
            };
            const assigneeQuery = await strapi
              .query("activityassignee", "crm-plugin")
              .findOne(activityDetail);
            if (assigneeQuery == null) {
              activityAssignee = await strapi
                .query("activityassignee", "crm-plugin")
                .create(activityDetail);
            } else {
              activityAssignee = await strapi
                .query("activityassignee", "crm-plugin")
                .update({ activity: ctx.params.id }, activityDetail);
            }
          })
        );
      }
      // updates activity details for particular id according to parameters passed
      const { id } = ctx.params;
      activity = await strapi
        .query("activity", "crm-plugin")
        .update({ id }, ctx.request.body);

      if (activity.activityassignees.length) {
        let activityAssignees = [];
        let contacts = [];
        activityAssignees = activity.activityassignees.map(
          (activityAssignee) => {
            return activityAssignee.id;
          }
        );
        if (activityAssignees.length)
          contacts = await strapi
            .query("contact", "crm-plugin")
            .find({ activityassignees: activityAssignees });
        activity.contacts = contacts;
      }

      // return updated activity obj
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },

  /**
   * Method: delete
   * Parameters:
   *    - Request object
   *      - id: identifier of activity table
   * @description: This method deletes specific activity based on the id passed and returns details of the deleted activity.
   */
  delete: async (ctx) => {
    try {
      // deletes activity assignee of respective activity id
      const activityAssignee = await strapi
        .query("activityassignee", "crm-plugin")
        .delete({ activity: ctx.params.id });

      // deletes entire activity obj
      const activity = await strapi
        .query("activity", "crm-plugin")
        .delete(ctx.params);

      // returns deleted activity obj
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
      });
    } catch (error) {
      return ctx.badRequest(null, error.message);
    }
  },
};
