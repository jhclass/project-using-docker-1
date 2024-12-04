import { Module } from "@nestjs/common";
import { EditCertificateResolver } from "./edit-certificate.resolver";
import { EditCertificateService } from "./edit-certificate.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [EditCertificateResolver, EditCertificateService],
})
export class EditCertificateModule {}
