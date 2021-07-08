"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRenew = exports.authRegister = exports.authLogout = exports.authLogin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _User = _interopRequireDefault(require("../models/User"));

var _jwt = require("../helpers/jwt");

var authLogin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, findUser, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.prev = 1;
            _context.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            findUser = _context.sent;

            if (findUser) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'Params not registered'
            }));

          case 7:
            _context.next = 9;
            return _User["default"].isValidPassword(password, findUser.password);

          case 9:
            if (_context.sent) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'Params not conicidence'
            }));

          case 11:
            token = (0, _jwt.createToken)(findUser._id, findUser.name);
            return _context.abrupt("return", res.json({
              message: 'auth login',
              name: findUser.name,
              uid: findUser._id,
              token: token
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              message: 'Error, favor contactese con admin'
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 15]]);
  }));

  return function authLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.authLogin = authLogin;

var authLogout = function authLogout(req, res) {
  return res.json({
    message: 'auth logout'
  });
};

exports.authLogout = authLogout;

var authRegister = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, name, email, password, findUser, savedUser, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            findUser = _context2.sent;

            if (!findUser) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: 'Usuario con email ingresado anteriormente'
            }));

          case 7:
            _context2.t0 = _User["default"];
            _context2.t1 = name;
            _context2.t2 = email;
            _context2.next = 12;
            return _User["default"].encryptPassword(password);

          case 12:
            _context2.t3 = _context2.sent;
            _context2.t4 = {
              name: _context2.t1,
              email: _context2.t2,
              password: _context2.t3
            };
            savedUser = (0, _context2.t0)(_context2.t4);
            _context2.next = 17;
            return savedUser.save();

          case 17:
            //crear JWT
            token = (0, _jwt.createToken)(savedUser._id, name);
            return _context2.abrupt("return", res.status(201).json({
              message: 'auth register',
              uid: savedUser._id,
              name: name,
              token: token
            }));

          case 21:
            _context2.prev = 21;
            _context2.t5 = _context2["catch"](1);
            console.error(_context2.t5);
            return _context2.abrupt("return", res.status(500).json({
              message: 'Error, favor contactese con admin'
            }));

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 21]]);
  }));

  return function authRegister(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.authRegister = authRegister;

var authRenew = function authRenew(req, res) {
  try {
    var uid = req.uid,
        name = req.name;
    var token = (0, _jwt.createToken)(uid, name);
    return res.json({
      message: 'auth renew',
      token: token
    });
  } catch (err) {
    //console.error(err);
    return res.status(500).json({
      message: 'Problemas, comuniquese con su admin'
    });
  }
};

exports.authRenew = authRenew;