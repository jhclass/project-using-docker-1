import { Test, TestingModule } from "@nestjs/testing";
import { CreateStudentService } from "./create-student.service";
import { PrismaService } from "@src/prisma/prisma.service";
import { WebSocketGatewayService } from "@src/websocket/websocket.gateway";
import { GatewayMetadata } from "@nestjs/websockets";
import { CreateStudentStateService } from "@src/student-state/create-student-state/create-student-state.service";
import { IpRecord } from "@src/ip-record/entity/ipRecord.entity";
import { NotFoundException } from "@nestjs/common";

describe("CreateStudentService", () => {
  let service: CreateStudentService;
  let client: PrismaService;
  let gateway: WebSocketGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStudentService,
        {
          provide: PrismaService,
          useValue: {
            student: {
              count: jest.fn(),
              create: jest.fn(),
            },
            manageUser: {
              findMany: jest.fn(),
            },
            alarm: {
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: WebSocketGatewayService,
          useValue: {
            sendNewStudentNotification: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<CreateStudentService>(CreateStudentService);
    client = module.get<PrismaService>(PrismaService);
    gateway = module.get<WebSocketGatewayService>(WebSocketGatewayService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should be Defined", () => {
    expect(service).toBeDefined();
  });

  it("branchId 가 없으면 에러발생", async () => {
    const context = { req: { user: { id: 1, branchId: null } } };
    const name = "홍길동",
      phoneNum1 = "01012341234";

    const result = await service.createStudentFunc(context, name, phoneNum1);
    expect(result).toEqual({
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: "Error:branchId가 없습니다.",
    });

    expect(client.student.count).not.toHaveBeenCalled();
  });
});
