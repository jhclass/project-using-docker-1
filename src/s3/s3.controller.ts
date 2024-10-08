import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { S3Service } from "./s3.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body("folderName") folderName: string,
  ) {
    const url = await this.s3Service.uploadFile(file, folderName);
    return url;
  }
  @Post("delete")
  async deleteFile(
    @Body("url") url: string,
    @Body("folderName") folderName: string,
  ) {
    return this.s3Service.deleteFile(url, folderName);
  }
}
