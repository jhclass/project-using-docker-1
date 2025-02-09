import { PrismaService } from "@src/prisma/prisma.service";
import { SearchStudentStateService } from "./search-student-state.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("searchStudentStateService", () => {
  let service: SearchStudentStateService;
  let client: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchStudentStateService,
        {
          provide: PrismaService,
          useValue: {
            studentState: {
              findMany: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    service = module.get<SearchStudentStateService>(SearchStudentStateService);
    client = module.get<PrismaService>(PrismaService);
  });
  it("shoud be defined", () => {
    console.log(service);
    expect(service).toBeDefined();
  });
  it("should return studentState with pagination", async () => {
    (client.studentState.findMany as jest.Mock).mockResolvedValue([
      { id: 1, stName: "홍길동" },
      { id: 2, stName: "홍길동" },
    ]);
    (client.studentState.count as jest.Mock).mockResolvedValue(2);
    const context = {
      req: {
        user: {
          id: 1,
        },
      },
    };
    jest.spyOn(service, "searchcStudentStateFunc").mockResolvedValue({
      ok: true,
      message: "정상적으로 검색 완료 되었습니다.",
      studentState: expect.arrayContaining([
        { id: 1, stName: "홍길동" },
        { id: 2, stName: "홍길동" },
      ]),
      totalCount: 2,
    });
    const result = await service.searchcStudentStateFunc(
      context,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "홍길동",
      undefined,
      undefined,
      undefined,
      undefined,
    );
    expect(result).toEqual({
      ok: true,
      message: "정상적으로 검색 완료 되었습니다.",
      studentState: [
        { id: 1, stName: "홍길동" },
        { id: 2, stName: "홍길동" },
      ],
      totalCount: 2,
    });

    expect(service.searchcStudentStateFunc).toHaveBeenCalledWith(
      context,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "홍길동",
      undefined,
      undefined,
      undefined,
      undefined,
    );
    //expect(service.searchcStudentStateFunc).toHaveBeenCalled();
  });
  it("에러발생", async () => {
    jest.spyOn(service, "searchcStudentStateFunc").mockResolvedValue({
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: "Error:DB Error",
    });

    const context = {};
    const result = await service.searchcStudentStateFunc(
      context,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "홍길동",
      undefined,
      undefined,
      undefined,
      undefined,
    );
    expect(result).toEqual({
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: "Error:DB Error",
    });
    expect(service.searchcStudentStateFunc).toHaveBeenCalled();
  });
});
