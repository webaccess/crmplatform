"use strict";
/* jshint node:true */

var Base = require("./common/base");

const findOneParams = ["id"];
const requiredParams = ["name"];
var village = new Base(requiredParams, findOneParams);
module.exports = village;
