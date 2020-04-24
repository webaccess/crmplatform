"use strict";
/* jshint node:true */

var Base = require("./common/base");

const findOneParams = ["id"];
const requiredParams = ["name"];
var district = new Base(requiredParams, findOneParams);
module.exports = district;
