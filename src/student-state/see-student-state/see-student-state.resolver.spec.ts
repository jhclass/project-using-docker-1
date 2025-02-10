import { Test, TestingModule } from "@nestjs/testing";
import { SeeStudentStateResolver } from "./see-student-state.resolver";
import { SeeStudentStateService } from "./see-student-state.service";

describe("See StudentState Resovler", () => {
  let resolver: SeeStudentStateResolver;
  let seeStudentStateService: SeeStudentStateService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeeStudentStateResolver,
        {
          provide: SeeStudentStateService,
          useValue: {
            seeStudentStateFunc: jest.fn(),
          },
        },
      ],
    }).compile();
    resolver = module.get<SeeStudentStateResolver>(SeeStudentStateResolver);
    seeStudentStateService = module.get<SeeStudentStateService>(
      SeeStudentStateService,
    );
    console.log(resolver);
  });
  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
  describe("seeStudentState Query", () => {
    it("should see a studentState and return StudentStateResponse", async () => {
      (
        seeStudentStateService.seeStudentStateFunc as jest.Mock
      ).mockResolvedValue({
        ok: true,
        message: `정상적으로 조회 완료 되었습니다.`,
        totalCount: 2,
        studentState: [
          { id: 1, stName: "홍길동" },
          { id: 2, stName: "홍길동2" },
        ],
      });

      const result = await seeStudentStateService.seeStudentStateFunc({
        req: { user: { id: 1 } },
      });
      expect(result).toEqual({
        ok: true,
        message: `정상적으로 조회 완료 되었습니다.`,
        totalCount: 2,
        studentState: [
          { id: 1, stName: "홍길동" },
          { id: 2, stName: "홍길동2" },
        ],
      });
      expect(seeStudentStateService.seeStudentStateFunc).toHaveBeenCalled();
    });
  });
});
