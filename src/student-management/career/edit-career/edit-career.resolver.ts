import { Resolver, Mutation, Args, Context, Int } from "@nestjs/graphql";
import { EditCareerService } from "./edit-career.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class EditCareerResolver {
  constructor(private readonly editCareerService: EditCareerService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async editCareer(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("careerDetails")
    careerDetails: string,
    @Args("lastModifiedTime", { nullable: true })
    lastModifiedTime?: string,
  ): Promise<CommonResponse> {
    return this.editCareerService.editCareerFunc(
      context,
      id,
      careerDetails,
      lastModifiedTime,
    );
  }
}
