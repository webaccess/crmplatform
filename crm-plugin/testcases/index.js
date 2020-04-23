"use strict";
/* jshint node:true */

var State = require("./state.test.js");
var Contact = require("./contact.test.js");
var Tag = require("./tag.test.js");
var Contacttag = require("./contacttag.test.js");
var state = new State();
var contact = new Contact();
var tag = new Tag();
var contacttag = new Contacttag();
module.exports = {
  index: async () => {
    var s = await state.index();
    var c = await contact.index();
    var t = await tag.index();
    var ct = await contacttag.index();
  },
};
