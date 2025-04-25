import server from "@/server";


const start = async () => {
  try {
    await server.ready();
    const port = +server.config.API_PORT;
    const host = server.config.API_HOST;
    await server.listen({ port, host });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
