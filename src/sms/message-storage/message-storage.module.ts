import { Module } from "@nestjs/common";
import { CreateMessageStorageModule } from "./create-message-storage/create-message-storage.module";
import { DeleteMessageStorageModule } from "./delete-message-storage/delete-message-storage.module";
import { SeeMessageStorageModule } from "./see-message-storage/see-message-storage.module";

@Module({
  imports: [
    CreateMessageStorageModule,
    DeleteMessageStorageModule,
    SeeMessageStorageModule,
  ],
})
export class MessageStorageModule {}
