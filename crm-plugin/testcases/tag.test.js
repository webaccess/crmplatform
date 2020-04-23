#!/usr/bin/env node
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
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of contact controller
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
}

module.exports = Tag;
