"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _events = require("../controllers/events.controller");

var _jwtValidator = require("../middlewares/jwt-validator");

var _filesValidator = require("../middlewares/files-validator");

var _isDate = require("../helpers/isDate");

var router = (0, _express.Router)(); //todas tienen que pasar por la validacion del JWT

router.use(_jwtValidator.jwtValidator);
router.post('/', [//middlewares
(0, _expressValidator.check)('title', 'parametro title es obligatorio').notEmpty(), (0, _expressValidator.check)('start', 'parametro start (fecha de inicio) es obligatoria').custom(_isDate.isDate), (0, _expressValidator.check)('end', 'parametro end (fecha de termino) es obligatoria').custom(_isDate.isDate), _filesValidator.filesvalidator], _events.createEvent);
router.get('/:eventId', [//middlewares
], _events.getEventById);
router.get('/', [//middlewares
], _events.getEvents);
router.put('/:eventId', [//middlewares
], _events.updateEventById);
router["delete"]('/:eventId', [//middlewares
], _events.deleteEventById);
var _default = router;
exports["default"] = _default;