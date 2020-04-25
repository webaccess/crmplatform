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
    let actType;
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
        }
        const id = activityassignee.id;
        activity = await strapi
          .query("activity", "crm-plugin")
          .update(id, ctx.request.body);
        return sanitizeEntity(activity, {
          model: strapi.plugins["crm-plugin"].models["activity"],
        });
      } else {
        const demoParams = {
          title: "name",
          start_datetime: "2020-04-14T06:30:00.000Z",
          end_datetime: "2020-04-10T06:30:00.000Z",
        };
        const reqVal = ["title"];
        const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
          ctx.request.body,
          reqVal
        );
        if (result.error == true) {
          return ctx.badRequest(null, result.message);
        }
        activity = await strapi
          .query("activity", "crm-plugin")
          .create(ctx.request.body);
        if (ctx.request.body.contact) {
          let activityDetail = {
            activity: activity.id,
            contact: ctx.request.body.contact,
          };
          activityassignee = await strapi
            .query("activityassignee", "crm-plugin")
            .create(activityDetail);
        }

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
      let ids = ctx.params;
      const activityass = await strapi
        .query("activityassignee", "crm-plugin")
        .delete({ activity: ctx.params.id });
      const activity = await strapi
        .query("activity", "crm-plugin")
        .delete(ctx.params);
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activityassignee"],
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  },
};
