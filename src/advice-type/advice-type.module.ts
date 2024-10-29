import { Module } from "@nestjs/common";
import { AdviceTypeResolver } from "./advice-type.resolver";
import { AdviceTypeService } from "./advice-type.service";
import { PrismaModule } from "@src/prisma/prisma.module";
import { SeeAdviceTypeModule } from "./see-advice-type/see-advice-type.module";
import { EditAdviceTypeModule } from "./edit-advice-type/edit-advice-type.module";
import { CreateAdviceTypeModule } from "./create-advice-type/create-advice-type.module";
import { StaticPushAtModule } from "./static-push-at/static-push-at.module";
import { ChangeOrderAtModule } from "./change-order-at/change-order-at.module";

@Module({
  imports: [
    PrismaModule,
    SeeAdviceTypeModule,
    EditAdviceTypeModule,
    CreateAdviceTypeModule,
    StaticPushAtModule,
    ChangeOrderAtModule,
  ],
  providers: [AdviceTypeResolver, AdviceTypeService],
})
export class AdviceTypeModule {}
