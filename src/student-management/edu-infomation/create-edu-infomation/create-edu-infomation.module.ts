import { Module } from "@nestjs/common";
import { CreateEduInfomationResolver } from "./create-edu-infomation.resolver";
import { CreateEduInfomationService } from "./create-edu-infomation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateEduInfomationResolver, CreateEduInfomationService],
})
export class CreateEduInfomationModule {}
