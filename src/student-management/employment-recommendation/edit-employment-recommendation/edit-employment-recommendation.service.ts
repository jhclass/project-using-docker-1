import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";
import { validateIdExists } from "@src/utils/shared.utils";

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
        throw new BadRequestException(
          "id 와 lastModifiedTime 은 필수값 입니다.",
        );
      }
      const client = this.client;
      const { user } = context.req;
      const existingId = await client.employmentRecommendation.findUnique({
        where: {
          id,
        },
      });
      validateIdExists(existingId);
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
