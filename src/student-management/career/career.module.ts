import { Module } from "@nestjs/common";
import { CreateCareerModule } from "./create-career/create-career.module";
import { EditCareerModule } from "./edit-career/edit-career.module";
import { DeleteCareerModule } from "./delete-career/delete-career.module";

@Module({
  imports: [CreateCareerModule, EditCareerModule, DeleteCareerModule],
})
export class CareerModule {}
