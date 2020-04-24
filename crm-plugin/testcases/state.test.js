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
    var finds = await this.reqParamsTestcase("find");
    var creates = await this.reqParamsTestcase("create");
    var deleteMethods = await this.reqParamsTestcase("delete");
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
    let methodParams = {};
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        console.log("Required params test not applicable for find method");
        console.log("-------------");
        return;
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          request: {
            body: { is_active: false },
          },
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
        console.log("Required params test not applicable for delete method");
        console.log("-------------");
        return;
        break;
    }
    return await testcase.test("state", method, methodParams);
  };
}

module.exports = State;
