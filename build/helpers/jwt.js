"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var createToken = function createToken(uid, name) {
  try {
    return _jsonwebtoken["default"].sign({
      uid: uid,
      name: name
    }, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    });
  } catch (error) {
    console.error(error);
    return resizeBy.status(500).json({
      message: 'Problemas, contactese con el admin'
    });
  }
};

exports.createToken = createToken;