import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class EditEmploymentRecommendationService {
  constructor(private readonly client: PrismaService) {}
  async editEmploymentRecommendationFunc(
    context: any,
    id: number,
    lastModifiedTime: string,
    dateOfRecommendation?: string,
    recruitmentField?: string,
    companyName?: string,
    location?: string,
    phoneNum?: string,
    dateOfInterview?: string,
    employmentStatus?: string,
    reasonForNonEmployment?: string,
    certificateOfEmploymentStatus?: string,
  ) {
    try {
      //
      if (!id || !lastModifiedTime) {
        throw new Error("id 와 lastModifiedTime 은 필수값 입니다.");
      }
      const client = this.client;
      const { user } = context.req;
      const existingId = await client.employmentRecommendation.findUnique({
        where: {
          id,
        },
      });
      if (!existingId) {
        throw new Error(`id 가 존재하지 않습니다. 다시 확인하세요.`);
      }
      await client.employmentRecommendation.update({
        where: { id },
        data: {
          dateOfRecommendation,
          recruitmentField,
          companyName,
          location,
          phoneNum,
          dateOfInterview,
          employmentStatus,
          reasonForNonEmployment,
          certificateOfEmploymentStatus,
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
      console.error(error.message);
      return {
        ok: false,
        message: "에러발생! 에러메세지를 확인하세요.",
        Error: `Error:${error.message}`,
      };
    }
  }
}
