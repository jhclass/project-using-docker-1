import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { S3Service } from "@src/s3/s3.service";

@Injectable()
export class DeleteStudentPortfolioService {
  constructor(
    private readonly client: PrismaService,
    private readonly s3Service: S3Service,
  ) {}
  async deleteStudentPortfolioFunc(
    id: number,
    fileUrl: string,
    folderName: string,
  ) {
    try {
      if (!id || !fileUrl || !folderName) {
        throw new BadRequestException(
          "id,fileUrl,folderName 은 필수로 입력되어야 합니다.",
        );
      }
      const client = this.client;

      // filePath 가 유니크가 아니므로 findFirst
      const existingId = await client.studentPortfolio.findFirst({
        where: {
          id,
          filePath: {
            has: fileUrl,
          },
        },
      });
      if (!existingId) {
        throw new NotFoundException(
          "id가 존재 하지 않거나 해당경로(fileUrl)가 존재하지 않습니다. 다시 확인하세요.",
        );
      }
      const filePathArr = existingId.filePath;
      //파일이 1개 남아있으면 삭제 X
      if (filePathArr.length <= 1) {
        throw new BadRequestException(
          "파일이 1개 남아있는 상태에서는 삭제가 되지 않습니다. 먼저 포트폴리오를 등록하고 삭제하세요.",
        );
      }
      //파일 리스트(경로) 정리 (리스트 순서 정리)
      const fileterdFileUrl = filePathArr.filter((file) => file !== fileUrl);
      //s3 에서 이미지 삭제
      await this.s3Service.deleteFile(fileUrl, folderName);
      //db 업데이트
      await client.studentPortfolio.update({
        where: { id },
        data: {
          filePath: fileterdFileUrl,
        },
      });
      return {
        ok: true,
        message:
          "정상적으로 파일이 삭제 되었고(s3) 해당 배열에서 파일경로가 삭제 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인해주세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
