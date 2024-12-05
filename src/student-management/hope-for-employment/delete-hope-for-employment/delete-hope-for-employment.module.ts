import { Module } from "@nestjs/common";
import { DeleteHopeForEmploymentResolver } from "./delete-hope-for-employment.resolver";
import { DeleteHopeForEmploymentService } from "./delete-hope-for-employment.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteHopeForEmploymentResolver, DeleteHopeForEmploymentService],
})
export class DeleteHopeForEmploymentModule {}
