import fastify from "fastify";

const app = fastify();

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running on port 3333");
    console.log("Visit http://localhost:3333");
  });
