"use strict";

require("@babel/polyfill/noConflict");

var _server = _interopRequireDefault(require("./server"));

var _graphqlDepthLimit = _interopRequireDefault(require("graphql-depth-limit"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IN_PROD = process.env.NODE_ENV === "production";
var serverOptions = {
  port: process.env.PORT,
  cors: {
    origin: [/heroku\.com$/, /vercel\.app$/, "self"],
    methods: ["OPTIONS", "GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
  },
  endpoint: "/graphQL",
  subscriptions: "/subscriptions",
  playground: IN_PROD ? false : "/playground",
  validationRules: [(0, _graphqlDepthLimit["default"])(5)]
};

if (!IN_PROD) {
  serverOptions.cors.origin.push("http://localhost:3000");
  serverOptions.cors.origin.push("http://localhost:4000");
  serverOptions.cors.origin.push("http://localhost:5000");
}

var mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

_mongoose["default"].connect("mongodb+srv://".concat(process.env.mongodbURL, "?retryWrites=true&w=majority"), mongooseOptions);

_server["default"].start(serverOptions);

console.log("\x1b[36m%s\x1b[34m%s\x1b[0m", "Server Running");