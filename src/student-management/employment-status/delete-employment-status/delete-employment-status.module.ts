import { Module } from "@nestjs/common";
import { DeleteEmploymentStatusResolver } from "./delete-employment-status.resolver";
import { DeleteEmploymentStatusService } from "./delete-employment-status.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteEmploymentStatusResolver, DeleteEmploymentStatusService],
})
export class DeleteEmploymentStatusModule {}
