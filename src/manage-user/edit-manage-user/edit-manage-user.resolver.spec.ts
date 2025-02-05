import { Test, TestingModule } from "@nestjs/testing";
import { EditManageUserResolver } from "./edit-manage-user.resolver";
import { EditManageUserService } from "./edit-manage-user.service";

describe("Edit manageUser resover", () => {
  let resolver: EditManageUserResolver;
  let editManageUserService: Partial<EditManageUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditManageUserResolver,
        {
          provide: EditManageUserService,
          useValue: {
            editManageUserFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 수정완료 되었습니다.",
            }) as Partial<EditManageUserService>,
          },
        },
      ],
    }).compile();
    resolver = module.get<EditManageUserResolver>(EditManageUserResolver);
    editManageUserService = module.get<EditManageUserService>(
      EditManageUserService,
    );
  });
  it("should be defiend", () => {
    expect(resolver).toBeDefined();
  });
  describe("editManageUser", () => {
    it("should edit a manageUser and return CommonResponse", async () => {
      const userArgs = {
        context: {},
        id: 1,
        mUsername: "이진형",
        mPassword: "a123123",
        mGrade: 9,
        mRank: "팀장",
        mPhoneNum: "01012341234",
        mPhoneNumCompany: "01012341234",
        mPhoneNumInside: "01012341234",
        mPhoneNumFriend: "01012341234",
        mPart: ["영업팀팀"],
        mJoiningDate: "2025-01-01T23:00:00.000Z",
        mAddresses: "서울성동구",
        email: "aaa@naver.com",
        resign: "Y",
        mZipCode: "1234",
        mAddressDetail: "101호",
        lastModifiedTime: "2025-01-01T23:00:00.000Z",
        branchId: 1,
        mAvatar: "profile.jpg",
      };

      const result = await resolver.editManageUser.call(
        resolver,
        ...Object.values(userArgs),
      );
      expect(result).toEqual({
        ok: true,
        message: "정상적으로 수정완료 되었습니다.",
      });
      expect(editManageUserService.editManageUserFunc).toHaveBeenCalledWith(
        ...Object.values(userArgs),
      );
    });
  });
});
