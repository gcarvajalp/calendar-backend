"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

_app["default"].listen(_app["default"].get('PORT'), function () {
  console.log("Server started onn port ".concat(_app["default"].get('PORT')));
});