import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { SampleResolver } from "@src/sample/sample.resolver";
import { join } from "path";
import { PrismaService } from "@src/prisma/prisma.service";
import { CreateManageUserModule } from "@src/manage-user/create-manage-user/create-manage-user.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //typePaths: ['./src/**/*.gql'], // 경로 설정을 제대로 하지 않으면 안됩니다.
      autoSchemaFile: join(process.cwd(), "src/schema.gql"), // 자동으로 gql 생성. typeDefs 폴더에 따로 추가해 주지 않아도 됩니다.
    }),
    CreateManageUserModule,
  ],
  controllers: [AppController],
  providers: [AppService, SampleResolver, PrismaService],
})
export class AppModule {}
