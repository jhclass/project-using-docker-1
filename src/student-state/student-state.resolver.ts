import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaService } from "@src/prisma/prisma.service";
import { ManageUser } from "@src/result-dto/manageUser.dto";
import { StudentState } from "@src/result-dto/studentState.dto";
@Resolver(() => StudentState)
export class StudentStateResolver {
  constructor(private readonly client: PrismaService) {}
  @ResolveField(() => [ManageUser], { nullable: "itemsAndList" })
  async currentManager(@Parent() studentState: StudentState) {
    const { currentManagerId } = studentState;
    if (!currentManagerId) {
      return [];
    }
    console.log(currentManagerId);
    return this.client.manageUser.findMany({
      where: {
        id: currentManagerId,
      },
    });
  }
}
