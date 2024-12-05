import { Module } from "@nestjs/common";
import { CreateEmploymentStatusModule } from "./create-employment-status/create-employment-status.module";
import { EditEmploymentStatusModule } from "./edit-employment-status/edit-employment-status.module";
import { DeleteEmploymentStatusModule } from "./delete-employment-status/delete-employment-status.module";

@Module({
  imports: [
    CreateEmploymentStatusModule,
    EditEmploymentStatusModule,
    DeleteEmploymentStatusModule,
  ],
})
export class EmploymentStatusModule {}
