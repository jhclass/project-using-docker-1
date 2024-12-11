import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { S3Service } from "@src/s3/s3.service";
import { createCanvas } from "canvas";

@Injectable()
export class CreateStampService {
  constructor(
    private readonly client: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  private createVerticalStamp(adminName: string): Buffer {
    const width = 80;
    const height = 100;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // 배경 채우기
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // 원형 도장 테두리 그리기
    const radiusX = 34; // 가로 반지름
    const radiusY = 42; // 세로 반지름
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "#760c0c";
    ctx.lineWidth = 5;
    ctx.stroke();

    // 세로로 이름 쓰기
    ctx.fillStyle = "#760c0c";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const chars = adminName.split("");
    const charSpacing = (radiusY * 2 - 20) / chars.length;

    chars.forEach((char, index) => {
      ctx.save();
      ctx.translate(
        width / 2,
        (height - charSpacing * (chars.length - 1)) / 2 + charSpacing * index,
      );
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });

    return canvas.toBuffer();
  }

  async createStampFunc(context: any, manageUserId: number) {
    try {
      const { user } = context.req;
      //manageUserId 가 있는지 체크 해본다.
      const checkManager = await this.client.manageUser.findUnique({
        where: {
          id: manageUserId,
        },
        select: {
          mUsername: true,
        },
      });
      if (!checkManager) {
        throw new NotFoundException(
          "해당 관리자아이디가 없습니다. manageUserId 를 다시 확인하세요.",
        );
      }
      //매니저당 1개만 생성 가능하도록.
      const checkManagerInStamp = await this.client.stamp.findFirst({
        where: {
          manageUserId,
        },
      });
      if (checkManagerInStamp) {
        throw new ConflictException("이미 등록된 도장 이미지가 있습니다.");
      }
      //console.log(checkManager, "매니져체크");
      const shortUsername =
        checkManager.mUsername.length > 4
          ? checkManager.mUsername.substring(0, 3)
          : checkManager.mUsername;
      const imageBuffer = this.createVerticalStamp(
        String(shortUsername + "인"),
      );
      if (!imageBuffer) {
        throw new InternalServerErrorException(
          "스탬프 이미지가 정상적으로 생성되지 않았습니다.",
        );
      }

      //console.log(imageStream, "이미지 생성");
      //s3 에 이미지를 저장하고 경로를 저장한다.
      const folderName = "stamps";
      const file: Express.Multer.File = {
        buffer: imageBuffer,
        originalname: `${shortUsername}${"_stamp.png"}`, // 파일명 지정
        mimetype: "image/png", // MIME 타입 지정
        fieldname: "file", // Multer 호환 필드 이름
        size: imageBuffer.length, // 파일 크기
      } as any;

      let stampImageUrl = null;
      stampImageUrl = await this.s3Service.uploadFile(file, folderName);
      if (!stampImageUrl) {
        throw new InternalServerErrorException(
          "스탬프 이미지가 S3에 정상적으로 저장되지 않았습니다.",
        );
      }
      console.log(stampImageUrl, "이미지 경로");
      const createStampOk = await this.client.stamp.create({
        data: {
          manageUserId,
          imageUrl: stampImageUrl,
          branchId: user?.branchId,
        },
      });
      if (!createStampOk) {
        throw new InternalServerErrorException(
          "데이터가 정상적으로 생성되지 않았습니다.",
        );
      }
      return {
        ok: true,
        message: "해당 매니저의 스탬프 이미지가 생성되었습니다.",
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
