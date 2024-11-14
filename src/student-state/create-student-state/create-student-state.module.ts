import { Module } from "@nestjs/common";
import { CreateStudentStateService } from "./create-student-state.service";
import { CreateStudentStateResolver } from "./create-student-state.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";
import { WebSocketGatewayService } from "@src/websocket/websocket.gateway";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateStudentStateService,
    CreateStudentStateResolver,
    WebSocketGatewayService,
  ],
})
export class CreateStudentStateModule {}
