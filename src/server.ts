import fastify from "fastify";
import config from "@/plugins/config";
import routes from "@/routes/routes";


const server = fastify({ logger: 
  {
    level: process.env.LOG_LEVEL || "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    },
  }
 });

server.register(config);
server.register(routes);


export default server;

