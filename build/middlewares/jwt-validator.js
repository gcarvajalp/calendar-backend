"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtValidator = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var jwtValidator = function jwtValidator(req, res, next) {
  try {
    var token = req.header('x-token');

    if (!token) {
      return res.status(400).json({
        message: 'token not valid'
      });
    }

    var _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.SECRET_JWT_SEED),
        uid = _jwt$verify.uid,
        name = _jwt$verify.name;

    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.jwtValidator = jwtValidator;