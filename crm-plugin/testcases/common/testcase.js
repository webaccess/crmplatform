"use strict";

/**
 * Testcase base file
 *
 * @description: Parent class for all testcases.
 */
function Testcase() {
  this.test = async (controller, method, params) => {
    console.log("controller: " + controller);
    console.log("method: " + method);
    try {
      let callMethod = await strapi.plugins["crm-plugin"].controllers[
        controller
      ][method](params);
      console.log("respone: ", callMethod);
      console.log("result: TEST PASSED!!");
    } catch (error) {
      console.log("result: TEST FAILED!!");
      console.error("error", error);
    }
    console.log("-------------");
    return 0;
  };
}

module.exports = Testcase;