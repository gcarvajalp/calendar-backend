"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _mongoose = require("mongoose");

var _excluded = ["__v", "_id"];
var eventSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
eventSchema.method('toJSON', function () {
  var _this$toObject = this.toObject(),
      __v = _this$toObject.__v,
      _id = _this$toObject._id,
      object = (0, _objectWithoutProperties2["default"])(_this$toObject, _excluded);

  object.id = _id;
  return object;
});

var _default = (0, _mongoose.model)('Event', eventSchema);

exports["default"] = _default;