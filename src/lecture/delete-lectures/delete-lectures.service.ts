import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { S3Service } from "@src/s3/s3.service";

@Injectable()
export class DeleteLecturesService {
  constructor(
    private readonly client: PrismaService,
    private readonly s3Service: S3Service,
  ) {}
  async deleteLecturesFunc(context: any, id: number) {
    try {
      const { user } = context.req;
      const client = this.client;
      //개발자 와 마스터만 권한이 있다.
      const checkedGrade = await client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
        select: {
          mGrade: true,
        },
      });
      //console.log("접속자의 MGrade:",checkedGrade.mGrade)
      if (checkedGrade.mGrade !== 0 && checkedGrade.mGrade !== 1) {
        throw new Error("권한이 없는 아이디 입니다.");
      }
      // 존재하는 id 인가?
      const existingCheckId = await client.lectures.findUnique({
        where: {
          id,
        },
      });
      if (!existingCheckId) {
        throw new Error("존재하지 않는 강의 입니다. id 를 확인하세요.");
      }

      //파일도 함께 삭제 한다.
      //같은이름으로 저장되는 파일은 없다 (업로드시 시간정보도 들어가므로)
      if (existingCheckId.timetableAttached) {
        await this.s3Service.deleteFile(
          existingCheckId.timetableAttached,
          "timetables",
        );
      }
      console.log(existingCheckId.timetableAttached);
      await client.lectures.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
        message: "정상적으로 삭제완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
