import { Module } from "@nestjs/common";
import { DeleteBusinessAccountReqResolver } from "./delete-business-account-req.resolver";
import { DeleteBusinessAccountReqService } from "./delete-business-account-req.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [
    DeleteBusinessAccountReqResolver,
    DeleteBusinessAccountReqService,
  ],
})
export class DeleteBusinessAccountReqModule {}
