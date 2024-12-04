import { Module } from "@nestjs/common";
import { DeleteEduInfomationResolver } from "./delete-edu-infomation.resolver";
import { DeleteEduInfomationService } from "./delete-edu-infomation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteEduInfomationResolver, DeleteEduInfomationService],
})
export class DeleteEduInfomationModule {}
