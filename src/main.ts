import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn"],
  });
  // 전역 CORS 설정
  app.enableCors({
    origin: "http://localhost:8000", // 허용할 프론트엔드 주소
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
