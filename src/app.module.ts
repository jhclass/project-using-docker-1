import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { SampleResolver } from "@src/sample/sample.resolver";
import { join } from "path";
import { PrismaService } from "@src/prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { LoginModule } from "@src/login/login.module";
import { JwtStrategy } from "@src/jwt.strategy";
import { BranchModule } from "@src/branch/branch.module";
import { ManageUserModule } from "@src/manage-user/manage-user.module";
import { S3Module } from "@src/s3/s3.module";
import { RefreshTokenModule } from "@src/refresh-token/refresh-token.module";
import { MMeModule } from "@src/m-me/m-me.module";
import { CreateStudentStateModule } from "@src/student-state/create-student-state/create-student-state.module";
import { PermissionsGrantedModule } from "@src/permissions-granted/permissions-granted.module";
import { AdviceTypeModule } from "@src/advice-type/advice-type.module";
import { AlarmModule } from "@src/alarm/alarm.module";
import { WebsocketModule } from "@src/websocket/websocket.module";
import { AttendanceRecordModule } from "./attendance-record/attendance-record.module";
import { StudentStateModule } from "./student-state/student-state.module";
import { SubjectModule } from './subject/subject.module';

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
      debug: true,
      csrfPrevention: false, // CSRF 보호 비활성화
      formatError: (error) => {
        console.log(error); // 모든 에러 로그
        return error;
      },
    }),
    LoginModule,
    BranchModule,
    ManageUserModule,
    S3Module,
    RefreshTokenModule,
    MMeModule,
    CreateStudentStateModule,
    PermissionsGrantedModule,
    AdviceTypeModule,
    AlarmModule,
    WebsocketModule,
    AttendanceRecordModule,
    StudentStateModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService, SampleResolver, PrismaService, JwtStrategy],
})
export class AppModule {}
