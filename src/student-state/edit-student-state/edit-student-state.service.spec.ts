import { PrismaService } from "@src/prisma/prisma.service";
import { EditStudentStateService } from "./edit-student-state.service";
import { Test, TestingModule } from "@nestjs/testing";
import { EditStudentStateDto } from "./dto/edit-student-state.dto";

describe("Edit student state service", () => {
  let service: EditStudentStateService;
  let client: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditStudentStateService,
        {
          provide: PrismaService,
          useValue: {
            studentState: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    service = module.get(EditStudentStateService);
    client = module.get(PrismaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("필수값이 없을 경우 BadReqException 발생", async () => {
    const context = {
      req: {
        user: {
          id: 1,
        },
      },
    };
    const input: Partial<EditStudentStateDto> = {};
    const result = await service.editStudentStateFunc(
      context,
      input as EditStudentStateDto,
    );
    expect(result).toEqual({
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: "Error:id 와 lastModifiedTime 은 필수값 입니다.",
    });
  });
  it("존재하지 않는 id 일 경우 NotFoundException 발생", async () => {
    (client.studentState.findUnique as jest.Mock).mockResolvedValue(null);
    const context = {
      req: {
        user: {
          id: 1,
        },
      },
    };
    const input: EditStudentStateDto = {
      id: 1,
      lastModifiedTime: "2025-02-07T10:00:00Z",
      adviceTypes: [],
    };
    (client.studentState.findUnique as jest.Mock).mockResolvedValue(null);
    const result = await service.editStudentStateFunc(
      context,
      input as EditStudentStateDto,
    );
    expect(result).toEqual({
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: "Error:데이터가 존재 하지 않습니다. id를 다시 확인하세요.",
    });
  });
  //데이터 업로드
  it("정상적으로 데이터가 업데이트 되는 경우", async () => {
    const context = {
      req: {
        user: {
          id: 1,
        },
      },
    };
    const input: EditStudentStateDto = {
      id: 1,
      lastModifiedTime: "2025-02-07T10:00:00Z",
      adviceTypes: [2, 3],
    } as EditStudentStateDto;
    const existingData = {
      id: 1,
      adviceTypes: [{ id: 4 }, { id: 5 }],
    };
    (client.studentState.findUnique as jest.Mock).mockResolvedValue(
      existingData,
    );
    (client.studentState.update as jest.Mock).mockResolvedValue({});

    const result = await service.editStudentStateFunc(context, input);
    expect(result).toEqual({
      ok: true,
      message: "정상적으로 수정 완료 되었습니다.",
    });
    expect(client.studentState.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { adviceTypes: true },
    });
    expect(client.studentState.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        currentManager: { connect: { id: 1 } },
        adviceTypes: {
          disconnect: [{ id: 4 }, { id: 5 }],
          connect: [{ id: 2 }, { id: 3 }],
        },
        lastModifiedTime: "2025-02-07T10:00:00Z",
      },
    });
  });
  it("데이터베이스 에러발생 시 에러메세지 반환", async () => {
    const context = {
      req: {
        user: {
          id: 1,
        },
      },
    };
    const input: EditStudentStateDto = {
      id: 1,
      lastModifiedTime: "2025-02-07T10:00:00Z",
      adviceTypes: [],
    } as EditStudentStateDto;

    (client.studentState.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      adviceTypes: [],
    });
    (client.studentState.update as jest.Mock).mockRejectedValue(
      new Error("DB 업데이트 실패"),
    );
    const result = await service.editStudentStateFunc(context, input);
    expect(result).toEqual({
      ok: false,
      message: "에러발생! 에러메세지를 확인하세요.",
      error: "Error:DB 업데이트 실패",
    });
  });
});
