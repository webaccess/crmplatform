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
    var findOne = await this.emptyTestcase("findOne");
    var count = await this.emptyTestcase("count");
    var create = await this.emptyTestcase("create");
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
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of village controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          request: { body: {} },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("village", method, methodParams);
  };

  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method) => {
    console.log("----In Village reqParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of village controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        console.log("Required params test not applicable for find method");
        console.log("-------------");
        break;
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          params: { name: "Maharashtra" },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        console.log("Required params test not applicable for count method");
        console.log("-------------");
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
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
          originalUrl: "/crm-plugin/villages",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("village", method, methodParams);
  };

  /* this method calls all testcases for correct params check */
  this.correctParams = async (method) => {
    console.log("----In Village CorrectParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of villages controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        console.log("Correct params test not applicable for find method");
        console.log("-------------");
        break;
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          params: { id: 11 },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        console.log("Correct params test not applicable for count method");
        console.log("-------------");
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          request: {
            body: {
              name: "Hivre",
              abbreviation: "Hivre",
              identifier: "Hivre",
              is_active: true,
            },
          },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/villages",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("village", method, methodParams);
  };
}

module.exports = Village;
