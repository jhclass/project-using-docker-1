import { Test, TestingModule } from "@nestjs/testing";
import { CreateBranchResolver } from "./create-branch.resolver";
import { CreateBranchService } from "./create-branch.service";

describe("CreateBranchResolver", () => {
  let resolver: CreateBranchResolver;
  let createBranchService: Partial<CreateBranchService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBranchResolver,
        {
          provide: CreateBranchService,
          useValue: {
            createBranchServiceFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 생성완료 되었습니다.",
            }),
          } as Partial<CreateBranchService>,
        },
      ],
    }).compile();
    resolver = module.get<CreateBranchResolver>(CreateBranchResolver);
    createBranchService = module.get<CreateBranchService>(CreateBranchService);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });

  describe("createBranch", () => {
    it("should create a branch and return CommonResponse", async () => {
      const branchName = "newbranch";
      const result = await resolver.createBranch(branchName);
      expect(result).toEqual({
        ok: true,
        message: "정상적으로 생성완료 되었습니다.",
      });
      expect(createBranchService.createBranchServiceFunc).toHaveBeenCalledWith(
        branchName,
      );
    });
  });
});
