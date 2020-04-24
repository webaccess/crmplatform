"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function ActivityType() {
  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    var find = await this.emptyTestcase("find");
    var findOne = await this.reqParamsTestcase("findOne");
    var count = await this.reqParamsTestcase("count");
    var create = await this.emptyTestcase("create");
    var deleteMethod = await this.emptyTestcase("delete");
    var reqParamsfind = await this.reqParamsTestcase("find");
    var reqParamsfindOne = await this.reqParamsTestcase("findOne");
    var reqParamsCount = await this.reqParamsTestcase("count");
    var reqParamscreate = await this.reqParamsTestcase("create");
    var reqParamsdelete = await this.reqParamsTestcase("delete");
    var correctParamsfind = await this.correctParams("find");
    var correctParamsfindOne = await this.correctParams("findOne");
    var correctParamscount = await this.correctParams("count");
    var correctParamscreate = await this.correctParams("create");
    var correctParamsdelete = await this.correctParams("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of activitytype controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };

        break;
      case "findOne":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "create":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
          request: { body: {} },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("activitytype", method, methodParams);
  };

  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method) => {
    console.log("----In Activity type reqParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of activitytype controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
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
          originalUrl: "/crm-plugin/activitytypes",
          params: { name: "Volunteering" },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
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
          originalUrl: "/crm-plugin/activitytypes",
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
          originalUrl: "/crm-plugin/activitytypes",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("activitytype", method, methodParams);
  };

  /* this method calls all testcases for correct params check */
  this.correctParams = async (method) => {
    console.log("----In activitytypes CorrectParamsTestcase------");
    let methodParams = {};
    //this switch case needs to handle all methods of activitytypes controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
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
          originalUrl: "/crm-plugin/activitytypes",
          params: { id: 11 },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "count":
        methodParams = {
          originalUrl: "/crm-plugin/activitytypes",
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
          originalUrl: "/crm-plugin/activitytypes",
          request: {
            body: {
              name: "Type 1",
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
          originalUrl: "/crm-plugin/activitytypes",
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("activitytype", method, methodParams);
  };
}

module.exports = ActivityType;
