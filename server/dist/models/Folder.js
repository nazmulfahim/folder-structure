"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var FolderSchema = new Schema({
  parentFolderID: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Folder",
    required: function required() {
      return !this.isRoot;
    }
  },
  name: {
    type: String,
    required: true,
    trim: true,
    escape: true
  },
  isRoot: {
    type: Boolean
  }
});
module.exports = _mongoose["default"].model("Folder", FolderSchema);