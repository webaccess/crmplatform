"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function District() {
  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    console.log("\n\nDistrict Module Test Case");
    console.log("=============");
    var find = await this.emptyTestcase("find");
    var create = await this.emptyTestcase("create");
    var findOne = await this.emptyTestcase("findOne");
    var count = await this.emptyTestcase("count");
    var deleteMethod = await this.emptyTestcase("delete");
    var reqParamsfind = await this.reqParamsTestcase("find");
    var reqParamsfindOne = await this.reqParamsTestcase("findOne");
    var reqParamsCount = await this.reqParamsTestcase("count");
    var reqParamscreate = await this.reqParamsTestcase("create");
    var reqParamsdelete = await this.reqParamsTestcase("delete");
    var correctParamsfind = await this.correctParams("find");
    var correctParamsfindOne = await this.correctParams("findOne");
    var correctParamsCount = await this.correctParams("count");
    var correctParamscreate = await this.correctParams("create");
    var correctParamsdelete = await this.correctParams("delete");

    console.log("=====END=====\n\n");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    console.log("\nEmpty Params Test Case");
    console.log("-------------");
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "findOne":
        console.log(
          "Empty params test not applicable for method " + method + "!!"
        );
        console.log("-------------");
        return;
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          request: { body: {} },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("district", method, methodParams);
  };

  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method) => {
    let methodParams = {};
    console.log("\nRequired Params Test Case");
    console.log("-------------");
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        console.log(
          "Required params test not applicable for method " + method + "!!"
        );
        console.log("-------------");
        return;
        break;
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          params: { id: 1 },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        console.log(
          "Required params test not applicable for method " + method + "!!"
        );
        console.log("-------------");
        return;
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
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
        console.log(
          "Required params test not applicable for method " + method + "!!"
        );
        console.log("-------------");
        return;
        break;
    }
    return await testcase.test("district", method, methodParams);
  };

  /* this method calls all testcases for correct params check */
  this.correctParams = async (method) => {
    let methodParams = {};
    console.log("\nCorrect Params Test Case");
    console.log("-------------");
    //this switch case needs to handle all methods of district controller
    switch (method) {
      case "find":
        console.log(
          "Correct params test not applicable for method " + method + "!!"
        );
        console.log("-------------");
        return;
        break;
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          params: { id: 1 },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        console.log(
          "Correct params test not applicable for method " + method + "!!"
        );
        return;
        console.log("-------------");
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/districts",
          request: {
            body: {
              name: "Thane",
              is_active: true,
              abbreviation: "TH",
              identifier: "TH",
            },
          },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        console.log(
          "Correct params test not applicable for method " + method + "!!"
        );
        console.log("-------------");
        return;
        break;
    }
    return await testcase.test("district", method, methodParams);
  };
}

module.exports = District;
