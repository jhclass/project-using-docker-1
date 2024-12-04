import { Module } from "@nestjs/common";
import { CreateCertificateModule } from "./create-certificate/create-certificate.module";
import { EditCertificateModule } from "./edit-certificate/edit-certificate.module";
import { DeleteCertificateModule } from "./delete-certificate/delete-certificate.module";

@Module({
  imports: [
    CreateCertificateModule,
    EditCertificateModule,
    DeleteCertificateModule,
  ],
  providers: [],
})
export class CertificateModule {}
