import { Test, TestingModule } from "@nestjs/testing";
import { CreateStudentResolver } from "./create-student.resolver";
import { CreateStudentService } from "./create-student.service";

describe("createStudentResovler", () => {
  let resolver: CreateStudentResolver;
  let createStudentService: CreateStudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStudentResolver,
        {
          provide: CreateStudentService,
          useValue: {
            createStudentFunc: jest.fn().mockImplementation((context) => {
              if (!context.req.user.branchId) {
                return Promise.resolve({
                  ok: false,
                  message: "에러발생! 에러메세지를 확인하세요.",
                  error: "branchId 없음",
                });
              }
              return Promise.resolve({
                ok: true,
                message: `홍길동학생의 데이터가 생성되었습니다.`,
              });
            }),
          },
        },
      ],
    }).compile();
    resolver = module.get<CreateStudentResolver>(CreateStudentResolver);
    createStudentService =
      module.get<CreateStudentService>(CreateStudentService);
  });
  it("should be Defined", () => {
    expect(resolver).toBeDefined();
  });
  describe("createStudent(mutation)", () => {
    it("should create student return commonresponse", async () => {
      const context = {
        req: {
          user: { id: 1, branchId: 1 },
        },
      };
      const name = "홍길동",
        phoneNum1 = "01012341234";
      const result = await createStudentService.createStudentFunc(
        context,
        name,
        phoneNum1,
      );
      expect(result).toEqual({
        ok: true,
        message: `${name}학생의 데이터가 생성되었습니다.`,
      });
      expect(createStudentService.createStudentFunc).toHaveBeenCalledWith(
        context,
        name,
        phoneNum1,
      );
    });
  });
});
