import { Test, TestingModule } from "@nestjs/testing";
import { DeleteBranchResolver } from "./delete-branch.resolver";
import { DeleteBranchService } from "./delete-branch.service";

describe("Delete Branch Resolver", () => {
  let resolver: DeleteBranchResolver;
  let deleteBranchService: Partial<DeleteBranchService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteBranchResolver,
        {
          provide: DeleteBranchService,
          useValue: {
            deleteBranchFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 삭제완료 되었습니다.",
            }) as Partial<DeleteBranchService>,
          },
        },
      ],
    }).compile();
    resolver = module.get<DeleteBranchResolver>(DeleteBranchResolver);
    deleteBranchService = module.get<DeleteBranchService>(DeleteBranchService);
  });
  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
  describe("deleteBranch", () => {
    it("should delete a branch and return CommonResponse", async () => {
      const branchId = 1;
      const result = await resolver.deleteBranch(branchId);

      expect(result).toEqual({
        ok: true,
        message: "정상적으로 삭제완료 되었습니다.",
      });

      expect(deleteBranchService.deleteBranchFunc).toHaveBeenCalledWith(
        branchId,
      );
    });
  });
});
