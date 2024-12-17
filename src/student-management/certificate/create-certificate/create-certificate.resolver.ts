import { Args, Resolver, Mutation, Int, Context } from "@nestjs/graphql";
import { CreateCertificateService } from "./create-certificate.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class CreateCertificateResolver {
  constructor(
    private readonly createCertificateService: CreateCertificateService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async createCertificate(
    @Context() context: any,
    @Args("CAdate")
    CAdate: string, //취득일
    @Args("certificateName")
    certificateName: string, //자격증이름
    @Args("CertificateIssuer")
    CertificateIssuer: string, //발행처
    @Args("subjectId", { type: () => Int })
    subjectId: number,
    @Args("studentPaymentId", { type: () => Int })
    studentPaymentId: number,
    @Args("certificateLevel", { nullable: true })
    certificateLevel?: string, //급수 (필수아님)
  ): Promise<CommonResponse> {
    return this.createCertificateService.createCertificateFunc(
      context,
      CAdate,
      certificateName,
      CertificateIssuer,
      subjectId,
      studentPaymentId,
      certificateLevel,
    );
  }
}
