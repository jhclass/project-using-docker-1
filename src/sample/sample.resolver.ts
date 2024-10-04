import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class SampleResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
