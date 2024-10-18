import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { SampleResolver } from "@src/sample/sample.resolver";
import { join } from "path";
import { PrismaService } from "@src/prisma/prisma.service";
import { CreateManageUserModule } from "@src/manage-user/create-manage-user/create-manage-user.module";
import { EditManageUserModule } from "./manage-user/edit-manage-user/edit-manage-user.module";
import { ConfigModule } from "@nestjs/config";
import { S3Controller } from "@src/s3/s3.controller";
import { S3Service } from "@src/s3/s3.service";
import { DeleteManageUserModule } from "./manage-user/delete-manage-user/delete-manage-user.module";
import { LoginModule } from "@src/login/login.module";
import { JwtStrategy } from "@src/jwt.strategy";
import { SeeManageUserModule } from "@src/manage-user/see-manage-user/see-manage-user.module";
import { SearchManageUserModule } from "@src/manage-user/search-manage-user/search-manage-user.module";
import { CreateBranchModule } from "@src/branch/create-branch/create-branch.module";
import { EditBranchModule } from "@src/branch/edit-branch/edit-branch.module";
import { DeleteBranchModule } from "@src/branch/delete-branch/delete-branch.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //typePaths: ["src/schema.gql"], // 경로 설정을 제대로 하지 않으면 안됩니다.
      autoSchemaFile: join(process.cwd(), "src/schema.gql"), // 자동으로 gql 생성. typeDefs 폴더에 따로 추가해 주지 않아도 됩니다.
      // definitions: {
      //   //typecript class 자동생성
      //   path: join(process.cwd(), "src/result-dto/graphql.ts"),
      //   outputAs: "class",
      // },
    }),
    CreateManageUserModule,
    EditManageUserModule,
    DeleteManageUserModule,
    LoginModule,
    SeeManageUserModule,
    SearchManageUserModule,
    CreateBranchModule,
    EditBranchModule,
    DeleteBranchModule,
  ],
  controllers: [AppController, S3Controller],
  providers: [
    AppService,
    SampleResolver,
    PrismaService,
    S3Service,
    JwtStrategy,
  ],
})
export class AppModule {}
