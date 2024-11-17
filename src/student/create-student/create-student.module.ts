import { Module } from "@nestjs/common";
import { CreateStudentResolver } from "./create-student.resolver";
import { CreateStudentService } from "./create-student.service";
import { PrismaModule } from "@src/prisma/prisma.module";
import { WebSocketGatewayService } from "@src/websocket/websocket.gateway";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateStudentResolver,
    CreateStudentService,
    WebSocketGatewayService,
  ],
})
export class CreateStudentModule {}
