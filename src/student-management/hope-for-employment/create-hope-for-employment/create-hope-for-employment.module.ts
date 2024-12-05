import { Module } from "@nestjs/common";
import { CreateHopeForEmploymentResolver } from "./create-hope-for-employment.resolver";
import { CreateHopeForEmploymentService } from "./create-hope-for-employment.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateHopeForEmploymentResolver, CreateHopeForEmploymentService],
})
export class CreateHopeForEmploymentModule {}
