import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

@Injectable()
export class EditEmploymentStatusService {
  constructor(private readonly client: PrismaService) {}
  async editEmploymentStatusFunc(
    context: any,
    id: number,
    employmentType: string,
    dateOfEmployment: string,
    companyName: string,
    businessNum: string,
    responsibilities: string,
    location: string,
    phoneNum: string,
    businessSize: string,
    imploymentInsurance: string,
    proofOfImployment: string,
    relatedFields: string,
    completionType: string,
    lastModifiedTime: string,
  ) {
    try {
      const { user } = context.req;
      const client = this.client;
      //checking id
      const existingId = await client.employmentStatus.findUnique({
        where: {
          id,
        },
      });

      validateIdExists(existingId);

      await client.employmentStatus.update({
        where: { id },
        data: {
          employmentType,
          dateOfEmployment,
          companyName,
          businessNum,
          responsibilities,
          location,
          phoneNum,
          businessSize,
          imploymentInsurance,
          proofOfImployment,
          relatedFields,
          completionType,
          lastModifiedByUserId: user?.mUserId,
          lastModifiedByName: user?.mUsername,
          lastModifiedTime,
        },
      });
      return {
        ok: true,
        message: "정상적으로 수정완료 되었습니다.",
      };
    } catch (error) {
      console.log(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      };
    }
  }
}
