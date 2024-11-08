import { UseGuards } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "@src/auth/gql-auth.guard";
import { PrismaService } from "@src/prisma/prisma.service";
import { ManageUser } from "@src/result-dto/manageUser.dto";
import { StudentState } from "@src/result-dto/studentState.dto";
@Resolver(() => StudentState)
export class StudentStateResolver {
  constructor(private readonly client: PrismaService) {}
  @ResolveField(() => [ManageUser], { nullable: "itemsAndList" })
  @UseGuards(GqlAuthGuard)
  async currentManager(@Parent() studentState: StudentState) {
    const { currentManagerId } = studentState;
    if (!currentManagerId) {
      return [];
    }
    //console.log(currentManagerId);
    return this.client.manageUser.findMany({
      where: {
        id: currentManagerId,
      },
    });
  }
}