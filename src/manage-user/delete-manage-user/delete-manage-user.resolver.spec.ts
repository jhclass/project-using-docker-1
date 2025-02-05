import { Test, TestingModule } from "@nestjs/testing";
import { DeleteManageUserResolver } from "./delete-manage-user.resolver";
import { DeleteManageUserService } from "./delete-manage-user.service";

describe("delete manageUser resolver", () => {
  let resolver: DeleteManageUserResolver;
  let deleteManageUserService: Partial<DeleteManageUserService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteManageUserResolver,
        {
          provide: DeleteManageUserService,
          useValue: {
            deleteManageUserFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 삭제완료 되었습니다.",
            }) as Partial<DeleteManageUserService>,
          },
        },
      ],
    }).compile();
    resolver = module.get<DeleteManageUserResolver>(DeleteManageUserResolver);
    deleteManageUserService = module.get<DeleteManageUserService>(
      DeleteManageUserService,
    );
  });
  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
  describe("delete manageUser", () => {
    it("should delete a manageUser and return CommonResponse", async () => {
      const id = 1;
      const result = await resolver.deleteManageUser(id);
      expect(result).toEqual({
        ok: true,
        message: "정상적으로 삭제완료 되었습니다.",
      });
      expect(deleteManageUserService.deleteManageUserFunc).toHaveBeenCalledWith(
        id,
      );
    });
  });
});
