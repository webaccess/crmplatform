"use strict";

/**
 * Base file
 *
 * API: country, state, district, village, activitytype, activityassignee, contacttag.
 *
 * ctx: Context object contains request parameters
 *
 * @description: Parent class for all generic models like country, state, district, village, activitytype, activityassignee, contacttag.
 */
const { sanitizeEntity } = require("strapi-utils"); // removes private fields and its relations from model

// to get the model name
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
   * @description: This method returns all the generic table details by default or specific details based on the filters passed to the method.
   */
  this.find = async (ctx) => {
    let table = getTable(ctx.originalUrl);

    try {
      let entity;

      /**
       * ctx.query._q: filters passed in URL
       * if filters are passed, get data based on a search
       * otherwise get entire data for the table
       */
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
   *      - id: identifier of contact table
   * @description: This method returns specific generic table details based on the id passed.
   */
  this.findOne = async (ctx) => {
    const { id } = ctx.params; // get id from context object
    let table = getTable(ctx.originalUrl);

    try {
      // returns all data of the id passed
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
   * @description:  This method returns the total number of data items present in the generic table by default or number of data items matching the criteria based on the filters passed to the method.
   */
  this.count = async (ctx) => {
    let table = getTable(ctx.originalUrl);

    try {
      // returns total no. of data based on search
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
   * @description: This method creates an entry into the generic table with the attribute parameters passed to this method by default. It returns details of created data.
   */
  this.create = async (ctx) => {
    let entity;
    let table = getTable(ctx.originalUrl);

    try {
      // returns error message if required params not found/ empty params passed
      const result = strapi.plugins["crm-plugin"].services.utils.checkParams(
        ctx.request.body,
        this.requiredValues
      );
      if (result.error) {
        return ctx.send(result.message);
      }

      // creates data entry into the generic table
      entity = await strapi.query(table, "crm-plugin").create(ctx.request.body);

      // returns created data obj
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
   *      - id: identifier of generic table
   *      - Column attributes
   * @description: This method updates the specific data from the generic table based on the id with attribute parameters passed to it. It returns details of updated data.
   */
  this.update = async (ctx) => {
    let entity;
    let table = getTable(ctx.originalUrl);

    // updates data of generic table based on id passed
    try {
      if (ctx.params.id) {
        const { id } = ctx.params;
        entity = await strapi
          .query(table, "crm-plugin")
          .update({ id }, ctx.request.body);

        // returns updated data obj
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
   *      - id: identifier of generic table
   * @description: This method deletes specific generic table data based on the id passed and returns details of the deleted data.
   */
  this.delete = async (ctx) => {
    const { id } = ctx.params; // get id from context object
    let table = getTable(ctx.originalUrl);

    // deletes data of the generic table based on the id passed
    try {
      const entity = await strapi.query(table, "crm-plugin").delete({ id });

      // returns deleted data obj
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
