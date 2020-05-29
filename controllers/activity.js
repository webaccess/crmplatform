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
      activity = await strapi
        .query("activity", "crm-plugin")
        .create(ctx.request.body);
      if (ctx.request.body.contacts) {
        let activityassignees = [];
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

  delete: async (ctx) => {
    try {
      const activityassign = await strapi
        .query("activityassignee", "crm-plugin")
        .delete({ activity: ctx.params.id });
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
