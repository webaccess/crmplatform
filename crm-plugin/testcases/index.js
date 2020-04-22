"use strict";
/* jshint node:true */

var State = require("./state.test.js");
var Contact = require("./contact.test.js");
var Village = require("./village.test.js");
var ActivityType = require("./activitytype.test.js");

var state = new State();
var contact = new Contact();
var activityType = new ActivityType();
var village = new Village();

module.exports = {
  index: async () => {
    var s = await state.index();
    var c = await contact.index();
    var v = await village.index();
    var a = await activityType.index();
  },
};
