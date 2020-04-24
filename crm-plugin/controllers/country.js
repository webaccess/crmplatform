"use strict";
/* jshint node:true */

var Base = require("./common/base");

const requiredParams = ["name", "abbreviation"];
const findOneParams = ["id"];

var country = new Base(requiredParams, findOneParams);
module.exports = country;
