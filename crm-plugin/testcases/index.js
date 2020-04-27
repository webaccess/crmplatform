"use strict";
/* jshint node:true */

var State = require("./state.test.js");
var Contact = require("./contact.test.js");

var Village = require("./village.test.js");
var ActivityType = require("./activitytype.test.js");
var District = require("./district.test.js");
var Country = require("./country.test.js");
var Activity = require("./activity.test.js");
var Tag = require("./tag.test.js");

var state = new State();
var contact = new Contact();
var activityType = new ActivityType();
var village = new Village();
var district = new District();
var country = new Country();
var activity = new Activity();
var tag = new Tag();

module.exports = {
  index: async () => {
    var s = await state.index();
    var c = await contact.index();
    var v = await village.index();
    var a = await activityType.index();
    var d = await district.index();
    var c = await country.index();
    var act = await activity.index();
    var t = await tag.index();
  },
};