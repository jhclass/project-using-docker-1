import { Module } from "@nestjs/common";
import { CreateCertificateResolver } from "./create-certificate.resolver";
import { CreateCertificateService } from "./create-certificate.service";

@Module({
  providers: [CreateCertificateResolver, CreateCertificateService],
})
export class CreateCertificateModule {}
