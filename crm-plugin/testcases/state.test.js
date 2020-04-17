"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
var test = {
  emptyTestcase: async (method) => {
    testcase.test("state", method, {
      originalUrl: "/crm-plugin/states",
      query: {},
    });
  },
};

module.exports = test;
