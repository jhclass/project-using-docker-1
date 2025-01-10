import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  // PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as path from "path";
import { DeleteFileResponse } from "@src/s3/entity/s3.entity";
import { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";
@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;
  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      },
    });
    this.bucketName = this.configService.get("AWS_S3_BUCKET_NAME");
  }
  private bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
  async uploadBase64Images(
    base64Images: string[],
    folderName: string,
  ): Promise<string[]> {
    try {
      const uploadPromises = base64Images.map(async (base64Images) => {
        const base64data = base64Images.replace(/data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64data, "base64");
        const fileExtension =
          base64Images.match(/data:image\/(\w+);base64,/)?.[1] || "png";
        const key = `${folderName}/${uuidv4()}.${fileExtension}`;

        const upload = new Upload({
          client: this.s3Client,
          params: {
            Bucket: this.bucketName,
            Key: key,
            Body: buffer,
            ContentType: `image/${fileExtension}`,
            ACL: "public-read",
          },
        });
        await upload.done();
        return `https://${this.bucketName}.s3.${this.configService.get(
          "AWS_REGION",
        )}.amazonaws.com/${key}`;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error("s3 업로드 실패:", error);
      throw new InternalServerErrorException("s3 이미지 업로드 실패");
    }
  }
  async uploadFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    if (!file || !folderName) {
      throw new BadRequestException(
        "첨부 된 파일,폴더 이름 지정이 반드시 필요합니다.",
      );
    }
    //폴더 와 이름.
    const ext = path.extname(file.originalname);
    const key = `${folderName}/${uuidv4()}${ext}`;
    //console.log(key);
    console.log("파일 데이터:", file);
    console.log("폴더 이름:", folderName);
    //const params: PutObjectCommandInput = {
    // Bucket: this.bucketName,
    // Key: key,
    // Body: this.bufferToStream(file.buffer),
    // ContentType: file.mimetype,
    //  ACL: "public-read", // 퍼블릭 읽기 권한 추가
    // };
    //const command = new PutObjectCommand(params);
    const fileStream = this.bufferToStream(file.buffer);
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucketName,
          Key: key,
          Body: fileStream,
          ContentType: file.mimetype,
          ACL: "public-read",
        },
      });

      await upload.done();
      console.log(
        `https://${this.bucketName}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${key}`,
      );
      //await this.s3Client.send(command);
      return `https://${this.bucketName}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${key}`;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("file upload failed");
    }
  }
  async getPresignedUrl(key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
  async deleteFile(
    url: string,
    folderName: string,
  ): Promise<DeleteFileResponse> {
    try {
      if (!folderName || !url) {
        throw new BadRequestException("folderName 과 url을 다시 확인하세요.");
      }
      const decodeUrl = decodeURI(url);
      const filePath = decodeUrl.split(`/${folderName}/`)[1];
      const fileName = `${folderName}/${filePath}`;
      const params = {
        Bucket: this.bucketName,
        Key: fileName,
      };
      const command = new DeleteObjectCommand(params);
      console.log(command);

      await this.s3Client.send(command);
      return {
        ok: true,
        message: "정상적으로 파일 삭제 완료 되었습니다.",
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
