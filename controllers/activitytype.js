"use strict";
/* jshint node:true */

/**
 * Activity Type
 *
 * API: Activitytype
 *
 * @description: Activity type stores details about basic types of activities that are stored in activity content type.
 */
var Base = require("./common/base");

const requiredParams = ["name"];
var activityType = new Base(requiredParams);
module.exports = activityType;
