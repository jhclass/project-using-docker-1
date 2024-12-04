import { Module } from "@nestjs/common";
import { DeleteCertificateResolver } from "./delete-certificate.resolver";
import { DeleteCertificateService } from "./delete-certificate.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeleteCertificateResolver, DeleteCertificateService],
})
export class DeleteCertificateModule {}
