import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@src/prisma/prisma.service";
import { generateRandomFourDigitNumber } from "@src/utils/shared.utils";
import { CreateBranchService } from "./create-branch.service";

jest.mock("@src/utils/shared.utils", () => ({
  generateRandomFourDigitNumber: jest.fn(),
}));
describe("CreateBranchService", () => {
  let service: CreateBranchService;
  let client: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBranchService,
        {
          provide: PrismaService,
          useValue: {
            branch: {
              findFirst: jest.fn().mockResolvedValue(null),
              create: jest
                .fn()
                .mockResolvedValue({ id: 2, branchName: "신촌_1234" }),
            },
          },
        },
      ],
    }).compile();
    service = module.get(CreateBranchService);
    client = module.get(PrismaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should create a branch succenssfully", async () => {
    (generateRandomFourDigitNumber as jest.Mock).mockReturnValue(1234);

    const branchName = "신촌";
    const randomInt = generateRandomFourDigitNumber();
    const result = await service.createBranchServiceFunc(branchName);
    expect(client.branch.findFirst).toHaveBeenCalledWith({
      where: { branchName: `${branchName}_${randomInt}` },
    });
    expect(client.branch.create).toHaveBeenLastCalledWith({
      data: { branchName: `${branchName}_${randomInt}` },
    });
    expect(result).toEqual({
      ok: true,
      message: "정상적으로 생성 완료 되었습니다.",
    });
  });
});
