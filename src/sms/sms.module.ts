import { Module } from '@nestjs/common';
import { SendSmsModule } from './send-sms/send-sms.module';
import { SearchSmsModule } from './search-sms/search-sms.module';
import { DeleteSmsModule } from './delete-sms/delete-sms.module';
import { MessageStorageModule } from './message-storage/message-storage.module';

@Module({
  imports: [SendSmsModule, SearchSmsModule, DeleteSmsModule, MessageStorageModule]
})
export class SmsModule {}
