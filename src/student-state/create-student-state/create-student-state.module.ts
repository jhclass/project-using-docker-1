import { Module } from "@nestjs/common";
import { CreateStudentStateService } from "./create-student-state.service";
import { CreateStudentStateResolver } from "./create-student-state.resolver";
import { PrismaModule } from "@src/prisma/prisma.module";
import { WebSocketGatewayService } from "@src/websocket/websocket.gateway";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottleInterceptor } from "common/interceptor/throttle.Interceptor";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateStudentStateService,
    CreateStudentStateResolver,
    WebSocketGatewayService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ThrottleInterceptor,
    },
  ],
})
export class CreateStudentStateModule {}
