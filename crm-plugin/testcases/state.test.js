"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function State() {
  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    var find = await this.emptyTestcase("find");
    var create = await this.emptyTestcase("create");
    var deleteMethod = await this.emptyTestcase("delete");
    var reqStateParamsfind = await this.reqParamsTestcase("find");
    var reqStateParamscreate = await this.reqParamsTestcase("create");
    var reqParamsdelete = await this.reqParamsTestcase("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of state controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          request: { body: {} },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("state", method, methodParams);
  };

  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method) => {
    console.log("----In State reqParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of state controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          request: {
            body: { is_active: "false" },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          params: {},
        };
        break;
    }
    return await testcase.test("state", method, methodParams);
  };
}

module.exports = State;
