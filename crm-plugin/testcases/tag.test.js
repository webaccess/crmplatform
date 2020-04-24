"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function Tag() {
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

    console.log("----In Tags emptyParamsTestcase------");
    let testCase = "emptyparams"
  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method,testCase) => {
    let methodParams = {};
    //this switch case needs to handle all methods of tag controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          request: { body: {} },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          params: {},
        };
        break;
    }
    return await testcase.test("tag", method, methodParams);
  };
   testCase = "requiredParams"
  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method,testCase) => {
    console.log("----In Tags reqParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          query: {},
        };
        console.log("Find is not applicable for required parameters.");
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          request: {
            body: { is_active: "false" },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          params: { },
        };
        console.log("Delete is not applicable for required parameters.");
        break;
    }
    return await testcase.test("tag", method, methodParams);
  };
   testCase = "Correctparams";
  this.correctParams = async (method,testCase) => {
    console.log("----In Tags CorrectParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          query: {},
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          request: {
            body: {
              name: "Sangli",
              is_active: "true",
              description: "Test description",
              contact: "5"
            },
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/tags",
          params: {},
        };
        break;
    }
    return await testcase.test("tag", method, methodParams);
  };
}

module.exports = Tag;