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
      console.log("TEST PASSED!!");
    } catch (error) {
      console.log("TEST FAILED!!");
      console.error("error", error);
    }
  };
}

module.exports = Testcase;
