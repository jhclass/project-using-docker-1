import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@src/prisma/prisma.service";
import { WebSocketGatewayService } from "@src/websocket/websocket.gateway";
import { CreateStudentStateService } from "./create-student-state.service";
import { CreateStudentStateDto } from "./dto/create-student-state.dto";

describe("create studentState service", () => {
  let service: CreateStudentStateService;
  let client: PrismaService;
  let gatewayService: WebSocketGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateStudentStateService,
        {
          provide: PrismaService,
          useValue: {
            ipRecord: {
              count: jest.fn().mockResolvedValue(0),
              create: jest.fn().mockResolvedValue({}),
            },
            branch: {
              findUnique: jest
                .fn()
                .mockResolvedValue({ branchName: "신촌_1980" }),
            },
            studentState: {
              create: jest.fn().mockResolvedValue({ id: 1 }),
            },
            manageUser: {
              findMany: jest.fn().mockResolvedValue([{ id: 2 }, { id: 3 }]),
            },
            alarm: {
              create: jest.fn().mockResolvedValue({}),
            },
          },
        },
        {
          provide: WebSocketGatewayService,
          useValue: {
            sendNewStudentStateNotification: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<CreateStudentStateService>(CreateStudentStateService);
    gatewayService = module.get<WebSocketGatewayService>(
      WebSocketGatewayService,
    );
    client = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be Defined", () => {
    expect(service).toBeDefined();
  });

  it("정상적인 상담 신청 시 데이터가 저장되고 알람이 전송되어야 한다.", async () => {
    const context = {
      req: {
        user: { id: 1, branchId: 5 },
        headers: { "x-forwarded-for": "123.456.789.10" },
      },
    };
    const input = {
      stName: "홍길동",
      agreement: "Y",
      progress: 0,
      adviceTypes: [1, 2],
      subject: ["수학"],
      phoneNum1: "01012345678",
      campus: "강남",
      detail: "상세 상담 내용",
      category: "입학 상담",
      phoneNum2: "",
      phoneNum3: "",
      stEmail: "test@example.com",
      stAddr: "서울 강남구",
      stVisit: "대면 상담",
      subDiv: "",
      expEnrollDate: "2025-02-10",
      perchase: true,
      birthday: "2000-01-01",
      receiptDiv: "",
      pic: "",
      classMethod: null,
      branchId: 5,
      today: ["2025-02-05", "2025-02-06"], // 오늘 날짜 범위
    };
    const result = await service.createStudentStateFunc(context, input);

    expect(client.studentState.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          stName: "홍길동",
          subject: ["수학"],
          campus: "강남",
          branchId: 5,
        }),
      }),
    );
    expect(client.alarm.create).toHaveBeenCalledWith({
      data: {
        title: "상담신청",
        content: "홍길동님이 상담신청을 하였습니다.",
        personalTarget: [2, 3],
        branchId: 5,
      },
    });

    expect(gatewayService.sendNewStudentStateNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "NEW_STUDENTSTATE",
        data: expect.objectContaining({
          studentname: "홍길동",
          alarmTitle: "새로운 상담신청 등록",
        }),
      }),
    );

    expect(result).toEqual({
      ok: true,
      message: "정상적으로 등록 완료 되었습니다.",
    });
  });
  it("IP 제한이 초과되었을 경우 예외 던지기", () => {
    jest.spyOn(client.ipRecord, "count").mockResolvedValue(10);
    const context = {
      req: {
        headers: { "x-forwarded-for": "123.456.789" },
      },
    };
    const input: Partial<CreateStudentStateDto> = {
      today: ["2025-02-05", "2025-02-06"],
    };
    expect(
      service.createStudentStateFunc(context, input as CreateStudentStateDto),
    );
  });
  it("today 배열이 유효하지 않으면 예외를 던져야 한다.", async () => {
    const context = {
      req: {
        user: {
          id: 1,
          branchId: 5,
        },
      },
    };
    const input: Partial<CreateStudentStateDto> = {
      today: ["2025-02-05"],
    };
    const result = await service.createStudentStateFunc(
      context,
      input as CreateStudentStateDto,
    );

    expect(result).toEqual({
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: "Error:오늘 날짜 범위를 정의하는 배열이 필요합니다.",
    });
  });
});
