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
    const findOneParams = ["id"];
    const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
      ctx.params,
      findOneParams
    );
    try {
      if (!result.error) {
        const { id } = ctx.params;
        const entity = await strapi
          .query("activity", "crm-plugin")
          .findOne({ id });
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models["activity"],
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
    let activityassignee;
    let activity;

    try {
      if (ctx.params.id) {
        if (ctx.request.body.contact) {
          let activityDetail = {
            activity: ctx.params.id,
            contact: ctx.request.body.contact,
          };
          activityassignee = await strapi
            .query("activityassignee", "crm-plugin")
            .update({ activity: ctx.params.id }, activityDetail);
          console.log("Activityassignee", activityassignee);
        }
        const { id } = ctx.params;
        console.log("{ id }", ctx.params);
        activity = await strapi
          .query("activity", "crm-plugin")
          .update({ id }, ctx.request.body);
        console.log("Activityassignee", activity);
        return sanitizeEntity(activity, {
          model: strapi.plugins["crm-plugin"].models["activity"],
        });
      } else {
        const reqVal = ["title"];
        const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
          ctx.request.body,
          reqVal
        );
        if (result.error == true) {
          return ctx.badRequest(null, result.message);
        }
        if (ctx.request.body.contact) {
          let activityDetail = {
            activity: activity.id,
            contact: ctx.request.body.contact,
          };
          activityassignee = await strapi
            .query("activityassignee", "crm-plugin")
            .create(activityDetail);
        }
        activity = await strapi
          .query("activity", "crm-plugin")
          .create(ctx.request.body);
        return sanitizeEntity(activity, {
          model: strapi.plugins["crm-plugin"].models["activity"],
        });
      }
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
