"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

_mongoose["default"].connect("".concat(process.env.MONGO_CONNECTION), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(function (db) {
  console.log("Server started on host ".concat(db.connection.host));
})["catch"](function (err) {
  console.log(err);
  throw new Error('Error inicializando la DB');
});