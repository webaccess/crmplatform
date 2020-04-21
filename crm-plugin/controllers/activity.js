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
    let activity;
    if (ctx.query._q) {
      activity = await strapi.query("activity", "crm-plugin").search(ctx.query);
    } else {
      activity = await strapi.query("activity", "crm-plugin").find(ctx.query);
    }

    return activity.map((entity) =>
      sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
      })
    );
  },

  create: async (ctx) => {
    let actType;
    let activity;
      if (ctx.params.id) {
        let activityDetails = {};
        activityDetails["activity"] = ctx.params.id;
        actType = await strapi
          .query(ctx.request.body.activitytype, "crm-plugin")
          .update(activityDetails, ctx.request.body);

        // update activity
        activity = await strapi
          .query("activity", "crm-plugin")
          .update(ctx.params, ctx.request.body);
      } else {
        //create activitytype
        actType = await strapi
          .query(ctx.request.body.activitytype, "crm-plugin")
          .create(ctx.request.body);

        let actOtherDetails = {};
        actOtherDetails[ctx.request.body.activitytype] = actType.id;

        // //create org
        let actDetails = Object.assign(actOtherDetails, ctx.request.body);
        // create contact
        activity = await strapi
        .query("activity", "crm-plugin")
        .create(actDetails);
    }
    return sanitizeEntity(activity, {
      model: strapi.plugins["crm-plugin"].models.activity,
    });
  },

  delete: async (ctx) => {
    const activity = await strapi
      .query("activity", "crm-plugin")
      .delete(ctx.params);

    let actTypeId = activity.activitytype
      ? activity.activitytype.id
      : "";
    console.log("orgId", actTypeId);
    if (actTypeId)
      await strapi
        .query(activity.activitytype, "crm-plugin")
        .delete({ id: actTypeId });
    return sanitizeEntity(activity, {
      model: strapi.plugins["crm-plugin"].models.activity,
    });
  },
};
