import { Module } from "@nestjs/common";
import { DeleteSmsResolver } from "./delete-sms.resolver";
import { DeleteSmsService } from "./delete-sms.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteSmsResolver, DeleteSmsService],
})
export class DeleteSmsModule {}
