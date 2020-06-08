"use strict";
/* jshint node:true */

/**
 * Village
 *
 * API: Village
 *
 * @description: Village stores village information belonging to a specific district.
 */
var Base = require("./common/base");

const requiredParams = ["name"];
var village = new Base(requiredParams);
module.exports = village;
