import { Module } from "@nestjs/common";
import { ClassCancellationResolver } from "./class-cancellation.resolver";
import { ClassCancellationService } from "./class-cancellation.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ClassCancellationResolver, ClassCancellationService],
})
export class ClassCancellationModule {}
