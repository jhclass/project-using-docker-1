import { Args, Int, Resolver, Mutation } from "@nestjs/graphql";
import { DeleteCertificateService } from "./delete-certificate.service";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";
import { UseGuards } from "@nestjs/common";
@Resolver()
export class DeleteCertificateResolver {
  constructor(
    private readonly deleteCertificateService: DeleteCertificateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async deleteCertificate(@Args("id", { type: () => Int }) id: number) {
    return this.deleteCertificateService.deleteCertificateFunc(id);
  }
}
