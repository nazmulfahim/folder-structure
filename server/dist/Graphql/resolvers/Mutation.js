"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Folder = _interopRequireDefault(require("../../models/Folder"));

var _isEmpty = _interopRequireDefault(require("../../utils/isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Mutation = {
  createFolder: function createFolder(parent, _ref, _ref2, info) {
    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var data, request;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _ref.data;
              request = _ref2.request;

              if (!(0, _isEmpty["default"])(data.name)) {
                _context.next = 4;
                break;
              }

              throw new Error("NameCan't be empty");

            case 4:
              if (!(0, _isEmpty["default"])(data.parentFolderID)) {
                _context.next = 6;
                break;
              }

              throw new Error("Techincal Issue! Please Inform Admin");

            case 6:
              _context.next = 8;
              return new _Folder["default"](data).save();

            case 8:
              return _context.abrupt("return", _context.sent);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  updateFolder: function updateFolder(parent, _ref3, _ref4, info) {
    return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      var data, request;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              data = _ref3.data;
              request = _ref4.request;

              if (!(0, _isEmpty["default"])(data.name)) {
                _context2.next = 4;
                break;
              }

              throw new Error("Name Cannot Be Empty");

            case 4:
              _context2.next = 6;
              return _Folder["default"].findByIdAndUpdate(data._id, {
                name: data.name
              }, {
                "new": true
              });

            case 6:
              return _context2.abrupt("return", _context2.sent);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  deleteFolder: function deleteFolder(parent, _ref5, _ref6, info) {
    return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var id, request, folder;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref5.id;
              request = _ref6.request;
              _context3.next = 4;
              return _Folder["default"].findById(id);

            case 4:
              folder = _context3.sent;

              if (!folder.isRoot) {
                _context3.next = 7;
                break;
              }

              throw new Error("Root Folder Cannot be Deleted");

            case 7:
              _context3.next = 9;
              return folder.remove();

            case 9:
              return _context3.abrupt("return", true);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
var _default = Mutation;
exports["default"] = _default;