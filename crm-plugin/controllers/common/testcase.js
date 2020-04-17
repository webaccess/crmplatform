"use strict";

/**
 * Testcase base file
 *
 * @description: Parent class for all testcases.
 */

function Testcase() {
  this.test = async (controller, method, params) => {
    try {
      let callMethod = await strapi.plugins["crm-plugin"].controllers[
        controller
      ][method](params);
    } catch (error) {
      console.error("failed", error);
    }
  };
}

module.exports = Testcase;
