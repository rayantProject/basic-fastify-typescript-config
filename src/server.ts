import fastify from "fastify";


const server = fastify({ logger: true });

server.get("/", async () => {
  return { hello: "world" };
});

export default server;
