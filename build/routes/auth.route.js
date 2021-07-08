"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _auth = require("../controllers/auth.controller");

var _filesValidator = require("../middlewares/files-validator");

var _jwtValidator = require("../middlewares/jwt-validator");

var router = (0, _express.Router)();
router.post('/', [//middlewares
(0, _expressValidator.check)('email', 'el email es obligatorio').isEmail(), (0, _expressValidator.check)('password', 'el password debe ser de 6 caracteres').isLength({
  min: 6
}), _filesValidator.filesvalidator], _auth.authLogin);
router.post('/new', [//middlewares
(0, _expressValidator.check)('name', 'el nombre es obligatorio').not().isEmpty(), (0, _expressValidator.check)('email', 'el email es obligatorio').isEmail(), (0, _expressValidator.check)('password', 'el password debe ser de 6 caracteres').isLength({
  min: 6
}), _filesValidator.filesvalidator], _auth.authRegister);
router.post('/logout', _auth.authLogout);
router.get('/renew', [//middlewares
_jwtValidator.jwtValidator], _auth.authRenew);
var _default = router;
exports["default"] = _default;