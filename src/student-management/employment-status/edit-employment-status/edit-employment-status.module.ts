import { Module } from "@nestjs/common";
import { EditEmploymentStatusResolver } from "./edit-employment-status.resolver";
import { EditEmploymentStatusService } from "./edit-employment-status.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditEmploymentStatusResolver, EditEmploymentStatusService],
})
export class EditEmploymentStatusModule {}
