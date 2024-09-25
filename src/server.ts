import { app } from "./app";
import { env } from "./env";

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`Server started at http://localhost:${env.PORT}`);
  })
  .catch((err) => {
    console.error(err);
  });
