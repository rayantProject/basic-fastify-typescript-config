import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import config from "@/plugins/config";
import routes from "@/routes";

const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  },
});

server.register(fastifyStatic, {
  root: path.join(__dirname, "../public")
  , prefix: "/public/", // optional: default '/'
});
server.register(config);
server.register(routes);

export default server;
