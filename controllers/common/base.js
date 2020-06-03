"use strict";

/**
 * Base file
 *
 * API: country, state, district, village, activitytype, activityassignee, contacttag.
 *
 * @description: Parent class for all generic models like country, state, district, village, activitytype, activityassignee, contacttag.
 */
const { sanitizeEntity } = require("strapi-utils");

function getTable(url) {
  let urlArr = url.split("/");
  let table = "";
  if (urlArr.length >= 3) table = urlArr[2];
  table = table == "countries" ? "country" : table.slice(0, table.length - 1);
  return table;
}

function Base(requiredValues = []) {
  this.requiredValues = requiredValues;
  /**
   * Method: find
   * Parameters:
   *    - Request object
   *      - Filters / Column attributes (Optional)
   * @description: This method returns all the generic table details by default or specific details with certain conditions based on the filters passed to the method.
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
      return ctx.badRequest(null, error.message);
    }
  };

  /**
   * Method: findOne
   * Parameters:
   *    - Request object
   *      - id - identifier of contact table
   * @description: This method returns specific generic table details by id.
   */
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
      return ctx.badRequest(null, error.message);
    }
  };

  /**
   * Method: count
   * Parameters:
   *    - Request object
   * @description:  This method returns total number of data items present in the generic table.
   */
  this.count = async (ctx) => {
    let table = getTable(ctx.originalUrl);
    try {
      if (ctx.query._q) {
        return strapi.query(table, "crm-plugin").countSearch(ctx.query);
      }
      return strapi.query(table, "crm-plugin").count(ctx.query);
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  };

  /**
   * Method: create
   * Parameters:
   *    - Request object
   *      - Rquired attributes
   *      - Column attributes (Optional)
   * @description: This method creates an entry into generic table with the attribute parameters passed to this method by default. It returns details of created data.
   */
  this.create = async (ctx) => {
    let entity;
    let table = getTable(ctx.originalUrl);

    try {
      const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
        ctx.request.body,
        this.requiredValues
      );
      if (result.error) {
        return ctx.send(result.message);
      }
      // create data entry into generic table
      entity = await strapi.query(table, "crm-plugin").create(ctx.request.body);
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models[table],
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  };

  /**
   * Method: update
   * Parameters:
   *    - Request object
   *      - id - identifier of generic table
   *      - Column attributes
   * @description: This method updates the specific data from gneric table by id with attribute parameters passed to it.It returns details of updated data.
   */
  this.update = async (ctx) => {
    let entity;
    let table = getTable(ctx.originalUrl);
    // update data of generic table
    try {
      if (ctx.params.id) {
        const { id } = ctx.params;
        entity = await strapi
          .query(table, "crm-plugin")
          .update({ id }, ctx.request.body);
        return sanitizeEntity(entity, {
          model: strapi.plugins["crm-plugin"].models[table],
        });
      }
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  };

  /**
   * Method: delete
   * Parameters:
   *    - Request object
   *      - id - identifier of generic table
   * @description: This method deletes specific generic table data by id and returns details of deleted data.
   */
  this.delete = async (ctx) => {
    const { id } = ctx.params;
    let table = getTable(ctx.originalUrl);
    //delete data of generic table
    try {
      const entity = await strapi.query(table, "crm-plugin").delete({ id });
      return sanitizeEntity(entity, {
        model: strapi.plugins["crm-plugin"].models[table],
      });
    } catch (error) {
      console.error(error);
      return ctx.badRequest(null, error.message);
    }
  };
}
module.exports = Base;
