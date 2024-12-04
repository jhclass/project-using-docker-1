import { Module } from "@nestjs/common";
import { EditCareerResolver } from "./edit-career.resolver";
import { EditCareerService } from "./edit-career.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditCareerResolver, EditCareerService],
})
export class EditCareerModule {}
