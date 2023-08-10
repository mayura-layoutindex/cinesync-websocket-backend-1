"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const http_1 = require("http");
const cors = require("cors");
const configuration_1 = require("./config/configuration");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    app.use(cors({
        origin: "*",
        credentials: true,
    }));
    const httpServer = (0, http_1.createServer)(app.getHttpAdapter().getInstance());
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    console.log("app is running on port " + (0, configuration_1.configuration)().port);
    await app.listen((0, configuration_1.configuration)().port);
}
bootstrap();
//# sourceMappingURL=main.js.map