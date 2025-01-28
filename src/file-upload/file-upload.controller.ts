import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { join } from "path";
import * as fs from "fs";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { v4 as uuid } from "uuid";

@Controller("file-upload")
export class FileUploadController {
  private tempDir = join(process.cwd(), "temp");
  constructor() {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir);
    }
  }

  @Post("temp")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, join(process.cwd(), "temp"));
        },
        filename(req, file, callback) {
          const uniqueName = `${uuid()}_${Date.now()}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const filePath = `/temp/${file.filename}`;
    return {
      ok: true,
      message: "파일이 temp 폴더에 임시저장 되었습니다.",
      filePath,
    };
  }
}
