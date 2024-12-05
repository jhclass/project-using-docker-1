import { Module } from "@nestjs/common";
import { CreateHopeForEmploymentModule } from "./create-hope-for-employment/create-hope-for-employment.module";
import { EditHopeForEmploymentModule } from "./edit-hope-for-employment/edit-hope-for-employment.module";
import { DeleteHopeForEmploymentModule } from "./delete-hope-for-employment/delete-hope-for-employment.module";

@Module({
  imports: [
    CreateHopeForEmploymentModule,
    EditHopeForEmploymentModule,
    DeleteHopeForEmploymentModule,
  ],
})
export class HopeForEmploymentModule {}
