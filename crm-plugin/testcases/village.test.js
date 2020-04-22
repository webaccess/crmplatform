"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function Village() {
  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    var find = await this.emptyTestcase("find");
    var create = await this.emptyTestcase("create");
    var deleteMethod = await this.emptyTestcase("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of state controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          request: { body: {} },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          params: {},
        };
        break;
    }
    return await testcase.test("village", method, methodParams);
  };

  this.index = async () => {
    var reqParamsfind = await this.reqParamsTestcase("find");
    var reqParamscreate = await this.reqParamsTestcase("create");
    var reqParamsdelete = await this.reqParamsTestcase("delete");
  };

  /* this method calls all testcases for empty params check */
  this.reqParamsTestcase = async (method) => {
    console.log("----In Village reqParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          request: {
            body: { is_active: "false" },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          params: { id: 9 },
        };
        break;
    }
    return await testcase.test("village", method, methodParams);
  };
}

module.exports = Village;
