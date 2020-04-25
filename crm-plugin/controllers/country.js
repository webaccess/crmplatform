"use strict";
/* jshint node:true */

var Base = require("./common/base");

const requiredParams = ["name", "abbreviation"];

var country = new Base(requiredParams);
module.exports = country;
