import { Test, TestingModule } from "@nestjs/testing";
import { CreateStudentStateResolver } from "./create-student-state.resolver";
import { CreateStudentStateService } from "./create-student-state.service";
import { CreateStudentStateDto } from "./dto/create-student-state.dto";

describe("create Student State resovler", () => {
  let resolver: CreateStudentStateResolver;
  let createStudentStateService: Partial<CreateStudentStateService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStudentStateResolver,
        {
          provide: CreateStudentStateService,
          useValue: {
            createStudentStateFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 생성완료 되었습니다.",
            }) as Partial<CreateStudentStateService>,
          },
        },
      ],
    }).compile();
    resolver = module.get<CreateStudentStateResolver>(
      CreateStudentStateResolver,
    );
    createStudentStateService = module.get<CreateStudentStateService>(
      CreateStudentStateService,
    );
  });
  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
  describe("createStudentState", () => {
    it("should create a studentState and return CommonResponse", async () => {
      const context = {};
      const input: CreateStudentStateDto = {
        agreement: "Y",
        progress: 0,
        adviceTypes: [0],
        subject: ["과목1"],
        stName: "홍길동",
        phoneNum1: "01012341234",
        campus: "신촌",
        detail: "상담신청하려고 왔어요",
        category: "디자인",
        phoneNum2: "01012341234",
        phoneNum3: "01012341234",
        stEmail: "aaa@naver.com",
        stAddr: "서울시 성북구",
        stVisit: "방문",
        subDiv: "과목명",
        expEnrollDate: "2025-01-01T00:00:00",
        perchase: true,
        birthday: "2025-01-01T00:00:00",
        receiptDiv: "receiptDiv",
        pic: "pic",
        classMethod: ["classMethod"],
        branchId: 1,
        today: ["2025-01-01T00:00:00"],
      };
      const result = await resolver.createStudentState(context, input);
      expect(result).toEqual({
        ok: true,
        message: "정상적으로 생성완료 되었습니다.",
      });
      expect(
        createStudentStateService.createStudentStateFunc,
      ).toHaveBeenCalledWith(context, input);
    });
  });
});
