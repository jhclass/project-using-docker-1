import { Module } from "@nestjs/common";
import { CreateCertificateModule } from "./create-certificate/create-certificate.module";

@Module({
  imports: [CreateCertificateModule],
})
export class CertificateModule {}
