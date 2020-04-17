"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
var test = {
  emptyTestcase: async (method) => {
    testcase.test("contact", method, {
      originalUrl: "/crm-plugin/contact",
      query: {},
    });
  },
};

module.exports = test;
