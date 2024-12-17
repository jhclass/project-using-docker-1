import { Args, Resolver, Mutation, Int, Context } from "@nestjs/graphql";
import { ClassCancellationService } from "./class-cancellation.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { CommonResponse } from "@src/common-entity/common-response.entity";

@Resolver()
export class ClassCancellationResolver {
  constructor(
    private readonly classCancellationService: ClassCancellationService,
  ) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => CommonResponse)
  async classCancellation(
    @Context() context: any,
    @Args("id", { type: () => Int })
    id: number,
    @Args("courseComplete")
    courseComplete: string,
    @Args("dateOfDroppingOut", { nullable: true })
    dateOfDroppingOut?: string,
    @Args("reasonFordroppingOut", { nullable: true })
    reasonFordroppingOut?: string,
    @Args("lastModifiedTime", { nullable: true })
    lastModifiedTime?: string,
  ): Promise<CommonResponse> {
    return this.classCancellationService.classCancellationFunc(
      context,
      id,
      courseComplete,
      dateOfDroppingOut,
      reasonFordroppingOut,
      lastModifiedTime,
    );
  }
}
