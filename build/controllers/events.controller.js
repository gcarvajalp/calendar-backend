"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEventById = exports.updateEventById = exports.getEvents = exports.getEventById = exports.createEvent = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _Event = _interopRequireDefault(require("../models/Event"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var createEvent = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, notes, start, end, newEvent;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, notes = _req$body.notes, start = _req$body.start, end = _req$body.end;
            _context.prev = 1;
            newEvent = (0, _Event["default"])({
              title: title,
              notes: notes,
              start: start,
              end: end
            });
            newEvent.user = req.uid;
            _context.next = 6;
            return newEvent.save();

          case 6:
            console.log(newEvent);
            return _context.abrupt("return", res.status(200).json({
              message: 'Created',
              event: newEvent
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);
            return _context.abrupt("return", res.status(500).json({
              message: 'Problemas, contactese con el admin'
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function createEvent(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createEvent = createEvent;

var getEventById = function getEventById(req, res) {
  var eventId = req.params.eventId;

  try {
    return res.status(200).json({
      message: "Get event by ID: ".concat(eventId)
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Problemas, contactese con el admin'
    });
  }
};

exports.getEventById = getEventById;

var getEvents = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var events;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Event["default"].find().populate('user', 'name');

          case 3:
            events = _context2.sent;
            return _context2.abrupt("return", res.status(200).json({
              message: 'Get events',
              events: events
            }));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            return _context2.abrupt("return", res.status(500).json({
              mesage: 'Problemas, contactese con el admin'
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getEvents(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getEvents = getEvents;

var updateEventById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var eventId, findEvent, newEvent, eventUpdated;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            eventId = req.params.eventId;
            _context3.prev = 1;
            _context3.next = 4;
            return _Event["default"].findById(eventId);

          case 4:
            findEvent = _context3.sent;

            if (findEvent) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: 'id event no coincide con nuestros registros'
            }));

          case 7:
            if (!(findEvent.user.toString() !== req.uid)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              message: 'usuario no permitido para editar'
            }));

          case 9:
            newEvent = _objectSpread(_objectSpread({}, req.body), {}, {
              user: req.uid
            });
            _context3.next = 12;
            return _Event["default"].findByIdAndUpdate(eventId, newEvent, {
              "new": true
            });

          case 12:
            eventUpdated = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              message: 'Update event',
              updated: eventUpdated
            }));

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).json({
              message: 'Problemas, contactese con el admin'
            }));

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 16]]);
  }));

  return function updateEventById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateEventById = updateEventById;

var deleteEventById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var eventId, findEvent, deletedEvent;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            eventId = req.params.eventId;
            _context4.prev = 1;
            _context4.next = 4;
            return _Event["default"].findById(eventId);

          case 4:
            findEvent = _context4.sent;

            if (findEvent) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: 'Evento no encontrado'
            }));

          case 7:
            console.log(req.uid, findEvent.user.toString());

            if (!(req.uid !== findEvent.user.toString())) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(403).json({
              message: 'accion no permitida para este usuario'
            }));

          case 10:
            _context4.next = 12;
            return _Event["default"].findByIdAndDelete(eventId);

          case 12:
            deletedEvent = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              message: 'Delete event',
              event: deletedEvent
            }));

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](1);
            console.error(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              message: 'Problemas, contactese con su proveedor'
            }));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 16]]);
  }));

  return function deleteEventById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteEventById = deleteEventById;