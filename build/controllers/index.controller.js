"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexRoute = void 0;

var indexRoute = function indexRoute(req, res) {
  return res.json({
    message: 'Index'
  });
};

exports.indexRoute = indexRoute;