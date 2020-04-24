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
    // var deleteMethod = await this.emptyTestcase("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
    switch (method) {
      case "find":
        methodParams = {
          query: {},
        };
        break;
      case "create":
        methodParams = {
          request: { body: {} },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          params: {},
        };
        break;
    }
    return await testcase.test("contact", method, methodParams);
  };

  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    var reqParamsfind = await this.reqParamsTestcase("find");
    var reqParamscreate = await this.reqParamsTestcase("create");
    var reqParamsdelete = await this.reqParamsTestcase("delete");
  };

  /* this method calls all testcases for empty params check */
  this.reqParamsTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
    switch (method) {
      case "find":
        methodParams = {
          query: {},
        };
        break;
      case "create":
        methodParams = {
          request: {
            body: {},
          },
          params: {},
        };
        break;
      case "delete":
        methodParams = {
          params: {},
        };
        break;
    }
    return await testcase.test("contact", method, methodParams);
  };
}

module.exports = Contact;
