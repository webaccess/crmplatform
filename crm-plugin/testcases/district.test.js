"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function District() {
  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    var find = await this.emptyTestcase("find");
    var create = await this.emptyTestcase("create");
    var deleteMethod = await this.emptyTestcase("delete");
    var reqParamsfind = await this.reqParamsTestcase("find");
    var reqParamscreate = await this.reqParamsTestcase("create");
    var reqParamsdelete = await this.reqParamsTestcase("delete");
    var correctParamsfind = await this.correctParams("find");
    var correctParamscreate = await this.correctParams("create");
    var correctParamsdelete = await this.correctParams("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          request: { body: {} },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          params: {},
        };
        break;
    }
    return await testcase.test("district", method, methodParams);
  };

  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method) => {
    console.log("----In Village reqParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          query: {},
        };
        console.log("Required params test not applicable for find method");
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          request: {
            body: { name: "Ankita", is_active: "false" },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          params: {},
        };
        console.log("Required params test not applicable for delete method");
        break;
    }
    return await testcase.test("district", method, methodParams);
  };

  /* this method calls all testcases for correct params check */
  this.correctParams = async (method) => {
    console.log("----In Village CorrectParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          request: {
            body: {
              name: "Sangli",
              is_active: "true",
              abbreviation: "SA",
              identifier: "SA",
            },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          params: {},
        };
        break;
    }
    return await testcase.test("district", method, methodParams);
  };
}

module.exports = District;
