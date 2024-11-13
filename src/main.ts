import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
dotenv.config();
async function bootstrap() {
  const server = express(); // Express 인스턴스 생성
  server.set("trust proxy", true); // trust proxy 설정
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: ["log", "error", "warn"],
  });

  app.enableCors({
    origin: "http://localhost:8000", // 허용할 프론트엔드 주소
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
