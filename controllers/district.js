"use strict";
/* jshint node:true */

/**
 * District
 *
 * API: District
 *
 * @description: District stores district information belonging to a specific state.
 */
var Base = require("./common/base");

const requiredParams = ["name"];
var district = new Base(requiredParams);
module.exports = district;
