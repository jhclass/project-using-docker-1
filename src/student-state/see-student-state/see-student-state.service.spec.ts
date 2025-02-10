import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@src/prisma/prisma.service";
import { SeeStudentStateService } from "./see-student-state.service";

describe("seeStudentStateService", () => {
  let service: SeeStudentStateService, client: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeeStudentStateService,
        {
          provide: PrismaService,
          useValue: {
            studentState: {
              count: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    service = module.get(SeeStudentStateService);
    client = module.get(PrismaService);
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("no exist branchid", async () => {
    const context = {
      req: {
        user: {
          id: 1,
          branchId: 5,
        },
      },
    };
    (client.studentState.count as jest.Mock).mockResolvedValue(1);
    jest.spyOn(client.studentState, "findMany").mockResolvedValue(
      expect.arrayContaining([
        { id: 1, stName: "홍길동" },
        { id: 2, stName: "홍길동2" },
      ]),
    );
    // (client.studentState.findMany as jest.Mock).mockResolvedValue([
    //   { id: 1, stName: "홍길동" },
    //   { id: 2, stName: "홍길동2" },
    // ]);
    const result = await service.seeStudentStateFunc(context);
    expect(result).toEqual({
      ok: true,
      message: `정상적으로 조회 완료 되었습니다.`,
      totalCount: 1,
      studentState: [
        { id: 1, stName: "홍길동" },
        { id: 2, stName: "홍길동2" },
      ],
    });

    expect(client.studentState.count).toHaveBeenCalledWith({
      where: {
        AND: [
          { branchId: context.req.user.branchId },
          {
            progress: {
              not: 110,
            },
          },
          {
            progress: {
              not: 60,
            },
          },
        ],
      },
    });
  });
});
