import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { CreateWorkBoardDto } from "./dto/create-work-board.dto";

@Injectable()
export class CreateWorkBoardService {
  constructor(private readonly client: PrismaService) {}
  async createWorkBoardFunc(
    context: any,
    createWorkBoardDto: CreateWorkBoardDto,
  ) {
    try {
      const { user } = context.req;
      const branchId = user.branchId;
      const client = this.client;
      const {
        title,
        writer,
        toPerson,
        toTeam,
        startDate,
        endDate,
        lastModifiedTime,
        filePath,
        workStatus,
        detail,
      } = createWorkBoardDto;
      if (toPerson) {
        if (toTeam) {
          const existingManageUser = client.manageUser.findFirst({
            where: {
              mUsername: createWorkBoardDto.toPerson,
              mPart: {
                has: createWorkBoardDto.toTeam,
              },
              branchId,
            },
          });
          if (!existingManageUser) {
            throw new NotFoundException(
              "팀(부서)와 전달 받는 직원의 이름을 다시 확인하세요.",
            );
          }
        } else {
          throw new BadRequestException(
            "팀(부서) 가 제대로 입력되었는지 확인하세요.",
          );
        }
      }
      await client.workBoard.create({
        data: {
          title,
          writer,
          toPerson,
          toTeam,
          startDate,
          endDate,
          lastModifiedTime,
          filePath,
          workStatus,
          detail,
        },
      });
      return {
        ok: true,
        message: "정상적으로 생성완료 되었습니다.",
      };
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error}`,
      };
    }
  }
}
