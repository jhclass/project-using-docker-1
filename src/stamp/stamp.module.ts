import { Module } from "@nestjs/common";
import { CreateStampModule } from "./create-stamp/create-stamp.module";

@Module({
  imports: [CreateStampModule],
})
export class StampModule {}
