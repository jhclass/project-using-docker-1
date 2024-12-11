import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateCareerService {
  constructor(private readonly client: PrismaService) {}
  async createCareerFunc(
    context: any,
    careerDetails: string,
    subjectId: number,
    studentPaymentId: number,
  ) {
    try {
      if (!subjectId || !studentPaymentId || !careerDetails) {
        throw new BadRequestException(
          "필수값을 확인하세요. 모든 데이터는 필수값으로 들어가야 합니다. ",
        );
      }
      const { user } = context.req;
      const client = this.client;
      //subjectId 와 studentPaymentId 확인 필요
      const existingSubjectId = await client.subject.findUnique({
        where: {
          id: subjectId,
        },
        include: {
          lectures: true,
        },
      });
      const existingStudentPaymentId = await client.studentPayment.findUnique({
        where: {
          id: studentPaymentId,
        },
        include: {
          student: true,
        },
      });
      const existingManageUserId = await client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
      });
      if (!existingSubjectId) {
        throw new NotFoundException("subjectId 를 다시 확인하세요.");
      } else if (!existingStudentPaymentId) {
        throw new NotFoundException("studentPaymentId 를 다시 확인하세요.");
      } else if (!existingManageUserId) {
        throw new NotFoundException(
          "manageUserId 를 다시 확인하세요. 지금 로그인이 되어있는 상태가 맞습니까?",
        );
      } else if (!existingSubjectId.lectures) {
        throw new BadRequestException(
          "강의가 배정되지 않았습니다. 강의를 배정한 후 다시 시도하세요.",
        );
      }
      await client.career.create({
        data: {
          lectureId: existingSubjectId?.lectures?.id,
          studentId: existingStudentPaymentId?.student?.id,
          stName: existingStudentPaymentId?.student?.name,
          careerDetails,
          subjectId,
          studentPaymentId,
          branchId: user?.branchId,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
        },
      });
      return {
        ok: true,
        message: "정상적으로 데이터가 생성되었습니다.",
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
