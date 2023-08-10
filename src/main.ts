import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { createServer } from "http";
import * as cors from "cors"; // Import cors module
import { configuration } from "./config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  // Enable CORS for your React app's origin
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  const httpServer = createServer(app.getHttpAdapter().getInstance()); // Create http server
  app.useWebSocketAdapter(new IoAdapter(app));

  console.log("app is running on port " + configuration().port);
  await app.listen(configuration().port);
}
bootstrap();
