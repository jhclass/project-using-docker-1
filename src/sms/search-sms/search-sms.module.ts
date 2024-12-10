import { Module } from "@nestjs/common";
import { SearchSmsResolver } from "./search-sms.resolver";
import { SearchSmsService } from "./search-sms.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SearchSmsResolver, SearchSmsService],
})
export class SearchSmsModule {}
