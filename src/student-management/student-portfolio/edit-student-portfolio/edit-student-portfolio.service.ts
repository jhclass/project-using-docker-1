import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditStudentPortfolioService {
  constructor(private readonly client: PrismaService) {}
  async editStudentPortfolioFunc(
    id: number,
    lastModifiedTime: string,
    isBest?: string,
    filePath?: string[],
    details?: string,
    url?: string[],
  ) {
    try {
      const client = this.client;
      // 기존 데이터 조회
      const existingId = await client.studentPortfolio.findUnique({
        where: {
          id,
        },
      });
      // id와 lastModifiedTime 확인
      if (!id || !lastModifiedTime) {
        throw new BadRequestException("id와 lastModifiedTime은 필수값입니다.");
      }

      // filePath 초기화
      if (!Array.isArray(filePath)) {
        filePath = [];
      }

      validateIdExists(existingId);
      if (existingId.url === null) {
        throw new BadRequestException(
          "url 은 null 일 수 없습니다. 반드시 빈 배열이라도 가지고 있어야 합니다.",
        );
      }
      // 기존 파일 경로 배열 확인
      const oldFilePathArr = existingId.filePath || [];
      if (!Array.isArray(oldFilePathArr)) {
        throw new BadRequestException("filePath 필드는 배열이어야 합니다.");
      }

      // 학생 포트폴리오 업데이트
      await client.studentPortfolio.update({
        where: { id },
        data: {
          isBest,
          details,
          url,
          filePath: filePath ?? oldFilePathArr,
          lastModifiedTime,
        },
      });

      return {
        ok: true,
        message: "정상적으로 수정 완료되었습니다.",
      };
    } catch (error) {
      console.error(error.message);

      return {
        ok: false,
        message: "에러 발생! 에러 메시지를 확인하세요.",
        error: `Error: ${error.message}`,
      };
    }
  }
}
