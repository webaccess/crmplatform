"use strict";

/**
 * Base file
 *
 * @description: Parent class for all generic models.
 */
const { sanitizeEntity } = require("strapi-utils");

function getTable(url) {
  let urlArr = url.split("/");
  let table = "";
  if (urlArr.length >= 3) table = urlArr[2];
  table = table == "countries" ? "country" : table.slice(0, table.length - 1);
  return table;
}

function Base() {
  /**
   * Default action.
   *
   * @return {Object}
   */

  this.find = async (ctx) => {
    let table = getTable(ctx.originalUrl);
    try {
      let entity;
      if (ctx.query._q) {
        entity = await strapi.query(table, "crm-plugin").search(ctx.query);
      } else {
        entity = await strapi.query(table, "crm-plugin").find(ctx.query);
      }
      return entity.map((ent) =>
        sanitizeEntity(ent, {
          model: strapi.plugins["crm-plugin"].models[table],
        })
      );
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };

  this.findOne = async (ctx) => {
    const { id } = ctx.params;
    let table = getTable(ctx.originalUrl);
    try {
      const entity = await strapi.query(table, "crm-plugin").findOne({ id });
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models[table],
      });
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };

  this.count = async (ctx) => {
    const { id } = ctx.params;
    let table = getTable(ctx.originalUrl);
    try {
      if (ctx.query._q) {
        return strapi.query(table, "crm-plugin").countSearch(ctx.query);
      }
      return strapi.query(table, "crm-plugin").count(ctx.query);
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };

  this.create = async (ctx) => {
    let entity;
    let table = getTable(ctx.originalUrl);
    var arr = [];
    let reqVal = [];
    // console.log("ctx.request.body--------", ctx.request.body);
    console.log("table-------", table);
    if (
      table == "district" ||
      table == "state" ||
      table == "activitytype" ||
      table == "village" ||
      table == "tag"
    )
      reqVal = ["name", "is_active"];
    if (table == "contact") {
      reqVal = ["name", "contact_type"];
    }
    if (table == "country") {
      reqVal = ["name", "abbreviation"];
    }
     const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
      ctx.request.body,
      reqVal
    );
     console.log("result.error",result);
      if (result.error == "false") {
    try {
      if (ctx.params.id) {
        const { id } = ctx.params;
        entity = await strapi
          .query(table, "crm-plugin")
          .update({ id }, ctx.request.body);
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models[table],
        });
      } else {
        entity = await strapi
          .query(table, "crm-plugin")
          .create(ctx.request.body);
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models[table],
        });
      }
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }else{
    return result.message;
  }
  };

  this.delete = async (ctx) => {
    const { id } = ctx.params;
    let table = getTable(ctx.originalUrl);
    try {
      const entity = await strapi.query(table, "crm-plugin").delete({ id });
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models[table],
      });
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };
}
module.exports = Base;
