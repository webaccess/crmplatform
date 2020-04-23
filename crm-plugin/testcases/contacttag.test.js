"use strict";
/* jshint node:true */

var Testcase = require("./common/testcase");

var testcase = new Testcase();
function Contacttag() {
  /*this method calls all testcases
   this method calls all testcase methods
  */
  this.index = async () => {
    var find = await this.emptyTestcase("find");
    var deleteMethod = await this.emptyTestcase("delete");
  };

  /* this method calls all testcases for empty params check */
  this.emptyTestcase = async (method) => {
    let methodParams = {};
    //this switch case needs to handle all methods of state controller
    switch (method) {
      case "find":
        methodParams = {
          originalUrl: "/crm-plugin/contacttags",
          query: {},
        };
        break;
      case "delete":
        methodParams = {
          originalUrl: "/crm-plugin/contacttags",
          params: {},
        };
        break;
    }
    return await testcase.test("contacttag", method, methodParams);
  };
}

module.exports = Contacttag;
