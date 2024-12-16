import { Module } from "@nestjs/common";
import { CreateBusinessAccountReqResolver } from "./create-business-account-req.resolver";
import { CreateBusinessAccountReqService } from "./create-business-account-req.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    CreateBusinessAccountReqResolver,
    CreateBusinessAccountReqService,
  ],
})
export class CreateBusinessAccountReqModule {}
