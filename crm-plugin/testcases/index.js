"use strict";
/* jshint node:true */

var State = require("./state.test.js");
var Contact = require("./contact.test.js");
var Activity = require("./activity.test.js");

var state = new State();
var contact = new Contact();
var activity = new Actibvity();
module.exports = {
  index: async () => {
    var s = await state.index();
    var c = await contact.index();
    var act = await activity.index();
  },
};
