import { Module } from '@nestjs/common';
import { DeleteStudentResolver } from './delete-student.resolver';
import { DeleteStudentService } from './delete-student.service';

@Module({
  providers: [DeleteStudentResolver, DeleteStudentService]
})
export class DeleteStudentModule {}
