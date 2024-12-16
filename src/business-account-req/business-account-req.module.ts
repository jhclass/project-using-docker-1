import { Module } from "@nestjs/common";
import { CreateBusinessAccountReqModule } from "./create-business-account-req/create-business-account-req.module";
import { EditBusinessAccountReqModule } from "./edit-business-account-req/edit-business-account-req.module";
import { DeleteBusinessAccountReqModule } from "./delete-business-account-req/delete-business-account-req.module";

@Module({
  imports: [
    CreateBusinessAccountReqModule,
    EditBusinessAccountReqModule,
    DeleteBusinessAccountReqModule,
  ],
})
export class BusinessAccountReqModule {}
