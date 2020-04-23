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
    if (ctx.query._q) {
      console.log("sdfhjdsfhjfdshj", ctx.query._q);
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
    let activityassignee;
    let activity;
    try {
      if (ctx.params.id) {
        const { id } = ctx.params;
        activity = await strapi
          .query("activity", "crm-plugin")
          .update({ id }, ctx.request.body);
          console.log("visha",ctx.request.body)

          if(ctx.request.body.contact){
            let activityDetail = {
              activity: activity.id,
              contact: ctx.request.body.contact,
            };
            activityassignee = await strapi
          .query("activityassignee", "crm-plugin")
          .update({ activity:ctx.params.id },activityDetail);  
          }
          
        return sanitizeEntity(activity, {
          model: strapi.plugins["crm-plugin"].models["activity"],
        });
      } else {
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
      return { error: error.message };
    }
  },

  delete: async (ctx) => {
    const activity = await strapi
      .query("activity", "crm-plugin")
      .delete(ctx.params);
    let actTypeId = activity.activitytype ? activity.activitytype.id : "";
    console.log("orgId", actTypeId);
    if (actTypeId) {
      await strapi
        .query(activity.activitytype, "crm-plugin")
        .delete({ id: actTypeId });
      return sanitizeEntity(activity, {
        model: strapi.plugins["crm-plugin"].models["activity"],
      });
    }
    let entity;
      entity = await strapi.query("activityassignee", "crm-plugin").delete({ activity:ctx.params.id });
    return sanitizeEntity(entity,{
      model: strapi.plugins["crm-plugin"].models["activityassignee"],
    });
 b 
  },
};
