"use strict";
import "@babel/polyfill/noConflict";
import server from "./server";
import depthLimit from "graphql-depth-limit";
import mongoose from "mongoose";

const IN_PROD = process.env.NODE_ENV === "production";

const serverOptions = {
  port: process.env.PORT,
  cors: {
    origin: [/heroku\.com$/, /vercel\.app$/, "self"],
    methods: ["OPTIONS", "GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  endpoint: "/graphQL",
  subscriptions: "/subscriptions",
  playground: IN_PROD ? false : "/playground",
  validationRules: [depthLimit(5)],
};

if (!IN_PROD) {
  serverOptions.cors.origin.push("http://localhost:3000");
  serverOptions.cors.origin.push("http://localhost:4000");
  serverOptions.cors.origin.push("http://localhost:5000");
}

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// Database connection
mongoose.connect(
  `mongodb+srv://${process.env.mongodbURL}?retryWrites=true&w=majority`,
  mongooseOptions
);

server.start(serverOptions);
console.log("\x1b[36m%s\x1b[34m%s\x1b[0m", "Server Running");
