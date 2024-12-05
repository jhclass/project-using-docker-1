import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class CreateEmploymentRecommendationService {
  constructor(private readonly client: PrismaService) {}
  async createEmploymentRecommendationFunc(
    context: any,
    dateOfRecommendation: string,
    recruitmentField: string,
    companyName: string,
    location: string,
    phoneNum: string,
    employmentStatus: string,
    reasonForNonEmployment: string,
    certificateOfEmploymentStatus: string,
    subjectId: number,
    studentPaymentId: number,
    dateOfInterview: string,
  ) {
    if (
      !dateOfRecommendation ||
      !recruitmentField ||
      !companyName ||
      !location ||
      !phoneNum ||
      !employmentStatus ||
      !reasonForNonEmployment ||
      !certificateOfEmploymentStatus ||
      !subjectId ||
      !studentPaymentId
    ) {
      throw new Error(
        "필수값을 확인하세요. 모든 데이터는 필수값으로 들어가야 합니다. ",
      );
    }
    const { user } = context.req;
    const client = this.client;
    //subjectId 와 studentPaymentId 확인 필요
    const existingSubjectId = await client.subject.findUnique({
      where: {
        id: subjectId,
      },
      include: {
        lectures: true,
      },
    });
    const existingStudentPaymentId = await client.studentPayment.findUnique({
      where: {
        id: studentPaymentId,
      },
      include: {
        student: true,
      },
    });
    const existingManageUserId = await client.manageUser.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (!existingSubjectId) {
      throw new Error("subjectId 를 다시 확인하세요.");
    } else if (!existingStudentPaymentId) {
      throw new Error("studentPaymentId 를 다시 확인하세요.");
    } else if (!existingManageUserId) {
      throw new Error("manageUserId 를 다시 확인하세요.");
    } else if (!existingSubjectId.lectures) {
      throw new Error(
        "강의배정이 되지 않았습니다. 강의배정을 하고 다시 시도 하세요.",
      );
    }
    await client.employmentRecommendation.create({
      data: {
        lectureId: existingSubjectId?.lectures?.id,
        studentId: existingStudentPaymentId?.student?.id,
        stName: existingStudentPaymentId?.student?.name,
        dateOfRecommendation,
        recruitmentField,
        companyName,
        location,
        phoneNum,
        dateOfInterview,
        employmentStatus,
        reasonForNonEmployment,
        certificateOfEmploymentStatus,
        subjectId,
        studentPaymentId,
        branchId: user?.branchId,
        lastModifiedByUserId: user?.mUserId,
        lastModifiedByName: user?.mUsername,
      },
    });
    return {
      ok: true,
      message: "정상적으로 등록완료 되었습니다.",
    };
  }
  catch(error) {
    console.error(error.message);
    return {
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: `Error:${error.message}`,
    };
  }
}
