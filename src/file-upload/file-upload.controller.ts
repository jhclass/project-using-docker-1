import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { extname, join } from "path";
import * as fs from "fs";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { v4 as uuid } from "uuid";

@Controller("file-upload")
export class FileUploadController {
  private tempDir = join(process.cwd(), "temp");
  private fileDir = join(process.cwd(), "files");
  constructor() {
    [this.tempDir, this.fileDir].forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    });
  }

  @Post("temp")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, join(process.cwd(), "temp"));
        },
        filename(req, file, callback) {
          const uniqueName = `${uuid()}_${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const filePath = `/temp/${file.filename}`;
    const fileName = `${file.filename}`;

    return {
      ok: true,
      message: "파일이 temp 폴더에 임시저장 되었습니다.",
      filePath,
      fileName,
    };
  }

  @Post("move")
  async moveFile(@Body("fileName") fileName: string) {
    const tempPath = join(this.tempDir, fileName);
    const filePath = join(this.fileDir, fileName);

    if (!fs.existsSync(tempPath)) {
      throw new BadRequestException("파일이름을 다시 확인하세요.");
    }

    try {
      fs.renameSync(tempPath, filePath);
      return {
        ok: true,
        message: "정상적으로 파일등록완료 되었습니다.",
        filePath,
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
