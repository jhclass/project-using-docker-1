import { Test, TestingModule } from "@nestjs/testing";
import { CreateManageUserResolver } from "./create-manage-user.resolver";
import { CreateManageUserService } from "./create-manage-user.service";

describe("create manageUser resovler", () => {
  let resolver: CreateManageUserResolver;
  let createManageUserService: Partial<CreateManageUserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateManageUserResolver,
        {
          provide: CreateManageUserService,
          useValue: {
            createManageUserFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 생성완료 되었습니다.",
            }) as Partial<CreateManageUserService>,
          },
        },
      ],
    }).compile();
    resolver = module.get<CreateManageUserResolver>(CreateManageUserResolver);
    createManageUserService = module.get<CreateManageUserService>(
      CreateManageUserService,
    );
  });
  it("it should be defined", () => {
    expect(resolver).toBeDefined();
  });
  describe("createManagerAccount", () => {
    it("should create a management account and return commonResponse", async () => {
      const userArgs = {
        context: {},
        mUserId: "test123",
        mUsername: "홍길동",
        mPassword: "password123",
        mGrade: 2,
        mRank: "팀장",
        mPart: ["개발팀"],
        mPhoneNum: "010-1234-5678",
        mPhoneNumCompany: "02-1234-5678",
        mPhoneNumFriend: "010-5678-1234",
        mPhoneNumInside: "070-1234-5678",
        mJoiningDate: "2025-01-01",
        mAddresses: "서울시 강남구",
        email: "test@example.com",
        mZipCode: "12345",
        mAddressDetail: "101호",
        branchId: 1,
      };
      const result = await resolver.createManagerAccount.call(
        resolver,
        ...Object.values(userArgs),
      );

      expect(result).toEqual({
        ok: true,
        message: "정상적으로 생성완료 되었습니다.",
      });
      expect(createManageUserService.createManageUserFunc).toHaveBeenCalledWith(
        ...Object.values(userArgs),
      );
    });
  });
});
