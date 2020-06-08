"use strict";
/* jshint node:true */

/**
 * Country
 *
 * API: Country
 *
 * @description: Country stores details of a country having some states.
 */
var Base = require("./common/base");

const requiredParams = ["name", "abbreviation", "is_active"];

var country = new Base(requiredParams);
module.exports = country;
