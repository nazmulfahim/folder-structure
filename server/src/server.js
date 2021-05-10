import { GraphQLServer, PubSub } from "graphql-yoga";
import { resolvers } from "./Graphql/resolvers/index";

import helmet from "helmet";
import hpp from "hpp";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: __dirname + "/Graphql/Schema/schema.graphql",
  resolvers,
  context(request) {
    return {
      pubsub,
      request,
    };
  },
  //Normally I Use Rate Limit To Limit Api Calls Per User
  // middlewares: [rateLimit],
});

const contentSecurityPolicy = {
  contentSecurityPolicy:
    process.env.NODE_ENV === "production"
      ? {
          directives: {
            defaultSrc: ["'self'", "*.trusted.com"],
            // scriptSrc: ["'self'", "*.trusted.com"],
            scriptSrc: ["'self'"],
            frameAncestors: ["'none'"],
            imgSrc: ["'self'", "*.trusted.com"],
            styleSrc: ["'none'"],
            objectSrc: ["*.trusted.com"],
            upgradeInsecureRequests: [],
          },
        }
      : false,
};

server.use(helmet(contentSecurityPolicy));
server.use(hpp());

export { server as default };
