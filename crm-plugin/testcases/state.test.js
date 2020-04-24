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
    var findOne = await this.emptyTestcase("findOne");
    var count = await this.emptyTestcase("count");
    var create = await this.emptyTestcase("create");
    var deleteMethod = await this.emptyTestcase("delete");
    var reqStateParamsfind = await this.reqParamsTestcase("find");
    var reqStateParamsfindOne = await this.reqParamsTestcase("findOne");
    var reqStateParamsCount = await this.reqParamsTestcase("count");
    var reqStateParamscreate = await this.reqParamsTestcase("create");
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
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
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
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        console.log("Reqired params test not applicable for find method");
        console.log("-------------");
        break;
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          params: { name: "Maharashtra" },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        console.log("Reqired params test not applicable for count method");
        console.log("-------------");
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
        break;
    }
    return await testcase.test("state", method, methodParams);
  };

  /* this method calls all testcases for correct params check */
  this.correctParams = async (method) => {
    console.log("----In states CorrectParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of states controller
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
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/states",
          params: { id: 11 },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/states",
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
          originalUrl: "/crm-plugin/states",
          request: {
            body: {
              name: "Maharashtra",
              is_active: true,
              abbreviation: "MH",
              identifier: "MH",
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
}

module.exports = State;
