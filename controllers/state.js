"use strict";
/* jshint node:true */

/**
 * State
 *
 * API: State
 *
 * @description: State stores state information belonging to a specific country.
 */
var Base = require("./common/base");

const requiredParams = ["name"];
var state = new Base(requiredParams);
module.exports = state;
