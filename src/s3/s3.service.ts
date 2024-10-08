import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as path from "path";
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
  async uploadFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    if (!file || !folderName) {
      throw new Error("첨부 된 파일,폴더 이름 지정이 반드시 필요합니다.");
    }
    //폴더 와 이름.
    const ext = path.extname(file.originalname);
    const key = `${folderName}/${uuidv4()}${ext}`;
    //console.log(key);
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const command = new PutObjectCommand(params);
    try {
      await this.s3Client.send(command);
      return `https://${this.bucketName}.s3.${this.configService.get("AWS_REGION")}.amazons.com/${key}`;
    } catch (error) {
      console.error(error);
      throw new Error("file upload failed");
    }
  }
  async getPresignedUrl(key: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }
}
