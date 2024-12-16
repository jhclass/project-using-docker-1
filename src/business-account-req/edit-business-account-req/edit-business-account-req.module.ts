import { Module } from "@nestjs/common";
import { EditBusinessAccountReqResolver } from "./edit-business-account-req.resolver";
import { EditBusinessAccountReqService } from "./edit-business-account-req.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditBusinessAccountReqResolver, EditBusinessAccountReqService],
})
export class EditBusinessAccountReqModule {}
