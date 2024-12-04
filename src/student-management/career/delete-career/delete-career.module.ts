import { Module } from "@nestjs/common";
import { DeleteCareerResolver } from "./delete-career.resolver";
import { DeleteCareerService } from "./delete-career.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteCareerResolver, DeleteCareerService],
})
export class DeleteCareerModule {}
