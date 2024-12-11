import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditCertificateService {
  constructor(private readonly client: PrismaService) {}
  async editCertificateFunc(
    context: any,
    id: number,
    lastModifiedTime: string,
    CAdate?: string,
    certificateName?: string,
    certificateLevel?: string,
    CertificateIssuer?: string,
  ) {
    try {
      if (!id || !lastModifiedTime) {
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }
      const { user } = context.req;
      const client = this.client;
      //id 가 있는지
      const existingId = await client.certificate.findUnique({
        where: {
          id,
        },
      });
      const existingManageUserId = await client.manageUser.findUnique({
        where: {
          id: user?.id,
        },
      });
      if (!existingId) {
        throw new NotFoundException(
          "id 가 존재하지 않습니다. 다시 확인하세요.",
        );
      } else if (!existingManageUserId) {
        throw new NotFoundException(
          "manageUserId 를 다시 확인하세요. 지금 로그인이 되어있는 상태가 맞습니까?",
        );
      }

      await client.certificate.update({
        where: { id },
        data: {
          CAdate,
          certificateName,
          certificateLevel,
          CertificateIssuer,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
          lastModifiedTime,
        },
      });
      return {
        ok: true,
        message: "정상적으로 수정완료 되었습니다.",
      };
    } catch ({ message }) {
      console.error(message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${message}`,
      };
    }
  }
}
