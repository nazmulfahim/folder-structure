"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlYoga = require("graphql-yoga");

var _index = require("./Graphql/resolvers/index");

var _helmet = _interopRequireDefault(require("helmet"));

var _hpp = _interopRequireDefault(require("hpp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pubsub = new _graphqlYoga.PubSub();
var server = new _graphqlYoga.GraphQLServer({
  typeDefs: __dirname + "/Graphql/Schema/schema.graphql",
  resolvers: _index.resolvers,
  context: function context(request) {
    return {
      pubsub: pubsub,
      request: request
    };
  }
});
exports["default"] = server;
var contentSecurityPolicy = {
  contentSecurityPolicy: process.env.NODE_ENV === "production" ? {
    directives: {
      defaultSrc: ["'self'", "*.trusted.com"],
      scriptSrc: ["'self'"],
      frameAncestors: ["'none'"],
      imgSrc: ["'self'", "*.trusted.com"],
      styleSrc: ["'none'"],
      objectSrc: ["*.trusted.com"],
      upgradeInsecureRequests: []
    }
  } : false
};
server.use((0, _helmet["default"])(contentSecurityPolicy));
server.use((0, _hpp["default"])());