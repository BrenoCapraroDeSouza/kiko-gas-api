import { app } from "./app";

app
  .listen({
    port: 3000,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("Server started at http://localhost:3000");
  })
  .catch((err) => {
    console.error(err);
  });
