"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function Country() {
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
    var correctParamsfind = await this.correctParams("find");
    var correctParamscreate = await this.correctParams("create");
    var correctParamsdelete = await this.correctParams("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of state controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          request: { body: {} },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          params: {},
        };
        break;
    }
    return await testcase.test("state", method, methodParams);
  };

  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method) => {
    console.log("----In countries reqParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of country controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          request: {
            body: { name: "England", is_active: false },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          params: {},
        };
        break;
    }
    return await testcase.test("country", method, methodParams);
  };
  /* this method calls all testcases for correct params check */
  this.correctParams = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of country controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          request: {
            body: { name: "England", is_active: "false", abbreviation: "EN" },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/countries",
          params: {},
        };
        break;
    }
    return await testcase.test("country", method, methodParams);
  };
}

module.exports = Country;
