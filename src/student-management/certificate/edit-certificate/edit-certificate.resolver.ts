import { Args, Context, Int, Mutation, Resolver } from "@nestjs/graphql";
import { EditCertificateService } from "./edit-certificate.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/result-dto/common-response.dto";

@Resolver()
export class EditCertificateResolver {
  constructor(
    private readonly editCertificateService: EditCertificateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editCertificate(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("lastModifiedTime")
    lastModifiedTime: string, //최근수정시간
    @Args("CAdate", { nullable: true })
    CAdate?: string, //취득일
    @Args("certificateName", { nullable: true })
    certificateName?: string, //자격증이름
    @Args("certificateLevel", { nullable: true })
    certificateLevel?: string, //급수 (필수아님)
    @Args("CertificateIssuer", { nullable: true })
    CertificateIssuer?: string, //발행처
  ): Promise<CommonResponse> {
    return this.editCertificateService.editCertificateFunc(
      context,
      id,
      lastModifiedTime,
      CAdate,
      certificateName,
      certificateLevel,
      CertificateIssuer,
    );
  }
}
