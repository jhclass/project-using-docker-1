import { Module } from "@nestjs/common";
import { PrismaModule } from "@src/prisma/prisma.module";
import { EditHopeForEmploymentResolver } from "./edit-hope-for-employment.resolver";
import { EditHopeForEmploymentService } from "./edit-hope-for-employment.service";

@Module({
  imports: [PrismaModule],
  providers: [EditHopeForEmploymentResolver, EditHopeForEmploymentService],
})
export class EditHopeForEmploymentModule {}
