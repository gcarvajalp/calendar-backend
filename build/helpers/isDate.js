"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = void 0;

var _moment = _interopRequireDefault(require("moment"));

var isDate = function isDate(value) {
  if (!value) {
    return false;
  }

  var fecha = (0, _moment["default"])(value);

  if (!fecha.isValid()) {
    return false;
  }

  return true;
};

exports.isDate = isDate;