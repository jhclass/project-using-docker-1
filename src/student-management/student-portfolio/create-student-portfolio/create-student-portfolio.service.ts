import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateStudentPortfolioService {
  constructor(private readonly client: PrismaService) {}
  async createStudentPortfolioFunc(
    context: any,
    studentPaymentId: number,
    subjectId: number,
    filePath?: string[],
    isBest?: string,
    details?: string,
    url?: string[],
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      if (!studentPaymentId || !subjectId) {
        throw new BadRequestException(
          "studentpaymentId 와 subjectId 는 필수값입니다.",
        );
      }

      if (!filePath || filePath.length === 0) {
        throw new BadRequestException(
          "포트폴리오는 적어도 1개 이상, 스크린샷으로 등록하여야 합니다.",
        );
      }
      const existingPortfolio = await client.studentPortfolio.findFirst({
        where: {
          studentPaymentId,
        },
      });
      if (existingPortfolio) {
        throw new ConflictException(
          "포트폴리오가 이미 존재합니다. 기존 포트폴리오를 수정하세요",
        );
      }
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
        throw new NotFoundException("manageUserId 를 다시 확인하세요.");
      } else if (!existingSubjectId.lectures) {
        throw new BadRequestException(
          "강의배정이 되지 않았습니다. 강의배정을 하고 다시 시도 하세요.",
        );
      }

      await client.studentPortfolio.create({
        data: {
          isBest,
          filePath,
          details,
          url,
          studentPaymentId,
          subjectId,
          lectureId: existingSubjectId?.lectures?.id,
          studentId: existingStudentPaymentId?.student?.id,
          stName: existingStudentPaymentId?.student?.name,
          branchId: user?.branchId,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
        },
      });
      return {
        ok: true,
        message: "정상적으로 등록완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        error: `Error: ${error.message}`,
        message: "에러발생 에러메세지를 확인하세요.",
      };
    }
  }
}
