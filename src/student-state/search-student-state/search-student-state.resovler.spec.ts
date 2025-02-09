import { Test, TestingModule } from "@nestjs/testing";
import { SearchStudentStateResolver } from "./search-student-state.resolver";
import { SearchStudentStateService } from "./search-student-state.service";

describe("searchStudentStateResolver", () => {
  let resolver: SearchStudentStateResolver;
  let service: Partial<SearchStudentStateService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchStudentStateResolver,
        {
          provide: SearchStudentStateService,
          useValue: {
            searchcStudentStateFunc: jest.fn(),
          },
        },
      ],
    }).compile();
    resolver = module.get<SearchStudentStateResolver>(
      SearchStudentStateResolver,
    );
    service = module.get<SearchStudentStateService>(SearchStudentStateService);
  });

  it("should be defined resolver", () => {
    console.log(resolver);
    expect(resolver).toBeDefined();
  });
  describe("searchStudentState", () => {
    it("should search a studentState and return searchStudentStateResult", async () => {
      (service.searchcStudentStateFunc as jest.Mock).mockResolvedValue({
        ok: true,
        message: "정상적으로 조회 완료 되었습니다.",
        data: [
          { id: 1, stName: "홍길동" },
          { id: 2, stName: "홍길현" },
        ],
        totalCount: 2,
      });
      const context = {};
      const id = 1;
      const result = await service.searchcStudentStateFunc(context, id);
      expect(result).toEqual({
        ok: true,
        message: "정상적으로 조회 완료 되었습니다.",
        data: [
          { id: 1, stName: "홍길동" },
          { id: 2, stName: "홍길현" },
        ],
        totalCount: 2,
      });
      expect(service.searchcStudentStateFunc).toHaveBeenCalledWith(context, id);
    });
  });
});
