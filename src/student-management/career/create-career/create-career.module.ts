import { Module } from "@nestjs/common";
import { CreateCareerResolver } from "./create-career.resolver";
import { CreateCareerService } from "./create-career.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateCareerResolver, CreateCareerService],
})
export class CreateCareerModule {}
