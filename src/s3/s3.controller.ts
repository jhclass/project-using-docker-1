import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { S3Service } from "./s3.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "@src/auth/jwt-auth.guard";

@Controller("s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
  @UseGuards(JwtAuthGuard)
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body("folderName") folderName: string,
    //@Request() req,
  ) {
    //console.log("req :", req);
    //const { id } = req.user;
    //console.log("id :", id);
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
