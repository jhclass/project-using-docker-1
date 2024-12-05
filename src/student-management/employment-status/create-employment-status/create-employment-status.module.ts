import { Module } from "@nestjs/common";
import { CreateEmploymentStatusResolver } from "./create-employment-status.resolver";
import { CreateEmploymentStatusService } from "./create-employment-status.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateEmploymentStatusResolver, CreateEmploymentStatusService],
})
export class CreateEmploymentStatusModule {}
