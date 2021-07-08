"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filesvalidator = void 0;

var _expressValidator = require("express-validator");

var filesvalidator = function filesvalidator(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.mapped()
    });
  }

  next();
};

exports.filesvalidator = filesvalidator;