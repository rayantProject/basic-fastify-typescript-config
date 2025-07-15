
import { FastifyPluginAsync } from "fastify";


const routes: FastifyPluginAsync = async (server) => {
  server.get(
    "/",
    async function (request, reply) {
        return reply.redirect("/public/readme.html");

    }
  );
};

export default routes;
