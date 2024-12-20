import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ValidateNumberService } from "./validate-number.service";
import { ResultValidateNumber } from "../entity/businessAccountReq.entity";
import { Public } from "@src/public-decorator/public-decorator.decorator";
import { ValidateNumberDto } from "./dto/validate-number.dto";

@Resolver()
export class ValidateNumberResolver {
  constructor(private readonly validateNumberService: ValidateNumberService) {}
  @Public()
  @Mutation(() => ResultValidateNumber)
  async validateNumber(
    @Args("input") input: ValidateNumberDto,
  ): Promise<ResultValidateNumber> {
    return this.validateNumberService.validateNumberFunc(input);
  }
}
