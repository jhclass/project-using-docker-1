import { Module } from "@nestjs/common";
import { CreateCertificateResolver } from "./create-certificate.resolver";
import { CreateCertificateService } from "./create-certificate.service";
import { PrismaModule } from "@src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [CreateCertificateResolver, CreateCertificateService],
})
export class CreateCertificateModule {}
