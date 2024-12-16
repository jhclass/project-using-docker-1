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
import { SubjectModule } from "./subject/subject.module";
import { UserActivityLogsModule } from "./user-activity-logs/user-activity-logs.module";
import { IpRecordModule } from "./ip-record/ip-record.module";
import { StudentModule } from "./student/student.module";
import { StampModule } from "./stamp/stamp.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { StudentPaymentModule } from "./student-payment/student-payment.module";
import { PaymentDetailModule } from "./payment-detail/payment-detail.module";
import { BatchService } from "./batch/batch.service";
import { LectureModule } from "./lecture/lecture.module";
import { AttendanceModule } from "./attendance/attendance.module";
import { WorklogsModule } from "./work-log/worklogs.module";
import { StudentManagementModule } from "./student-management/student-management.module";
import { SmsModule } from './sms/sms.module';
import { BusinessAccountReqModule } from './business-account-req/business-account-req.module';

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
    UserActivityLogsModule,
    IpRecordModule,
    StudentModule,
    StampModule,
    DashboardModule,
    StudentPaymentModule,
    PaymentDetailModule,
    LectureModule,
    AttendanceModule,
    WorklogsModule,
    StudentManagementModule,
    SmsModule,
    BusinessAccountReqModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SampleResolver,
    PrismaService,
    JwtStrategy,
    BatchService,
  ],
})
export class AppModule {}
