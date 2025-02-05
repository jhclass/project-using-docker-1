import { Test, TestingModule } from "@nestjs/testing";
import { EditBranchResolver } from "./edit-branch.resolver";
import { EditBranchService } from "./edit-branch.service";

describe("Edit Branch Resolver", () => {
  let resolver: EditBranchResolver;
  let editBranchService: Partial<EditBranchService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditBranchResolver,
        {
          provide: EditBranchService,
          useValue: {
            editBranchServiceFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 수정완료 되었습니다.",
            }) as Partial<EditBranchService>,
          },
        },
      ],
    }).compile();
    resolver = module.get<EditBranchResolver>(EditBranchResolver);
    editBranchService = module.get<EditBranchService>(EditBranchService);
  });
  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
  describe("editBranch", () => {
    it("should edit a branch and return commonResponse", async () => {
      const id = 1;
      const newBranchName = "홍대";
      const result = await resolver.editBranch(id, newBranchName);
      expect(result).toEqual({
        ok: true,
        message: "정상적으로 수정완료 되었습니다.",
      });
      expect(editBranchService.editBranchServiceFunc).toHaveBeenCalledWith(
        id,
        newBranchName,
      );
    });
  });
});
