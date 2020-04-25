#!/usr/bin/env node
"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function Contact() {
  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    var find = await this.emptyTestcase("find");
    var create = await this.emptyTestcase("create");
    var deleteMethod = await this.emptyTestcase("delete");
    var reqParamsfind = await this.reqParamsTestcase("find");
    var reqParamsfindOne = await this.reqParamsTestcase("findOne");
    var reqParamscreate = await this.reqParamsTestcase("create");
    var reqParamsdelete = await this.reqParamsTestcase("delete");
    var correctParamsfind = await this.correctParams("find");
    var correctParamsfindOne = await this.correctParams("findOne");
    var correctParamscreate = await this.correctParams("create");
    var correctParamsdelete = await this.correctParams("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
    switch (method) {
      case "find":
        methodParams = {
          query: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "findOne":
        methodParams = {
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;

      case "create":
        methodParams = {
          request: { body: {} },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        methodParams = {
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("contact", method, methodParams);
  };

  /* this method calls all testcases for required params check */
  this.reqParamsTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
    switch (method) {
      case "find":
        methodParams = {
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
          params: { name: "Maharashtra" },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;

      case "create":
        methodParams = {
          request: {
            body: { contact_type: "Individual" },
          },
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
      case "delete":
        methodParams = {
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("contact", method, methodParams);
  };

  /* this method calls all testcases for correct params check */
  this.correctParams = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
    switch (method) {
      case "find":
        methodParams = {
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
          params: { id: 11 },
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;

      case "create":
        methodParams = {
          request: {
            body: {
              name: "Tech Providers",
              contact_type: "organization",
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
          params: {},
          badRequest: (error, message) => {
            return { error: message };
          },
        };
        break;
    }
    return await testcase.test("contact", method, methodParams);
  };
}

module.exports = Contact;
