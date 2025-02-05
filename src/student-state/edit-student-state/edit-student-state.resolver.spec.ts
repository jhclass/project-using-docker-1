import { Test, TestingModule } from "@nestjs/testing";
import { EditStudentStateResolver } from "./edit-student-state.resolver";
import { EditStudentStateService } from "./edit-student-state.service";
import { EditStudentStateDto } from "./dto/edit-student-state.dto";

describe("Edit Student Resolver", () => {
  let resolver: EditStudentStateResolver;
  let editStudentStateService: Partial<EditStudentStateService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EditStudentStateResolver,
        {
          provide: EditStudentStateService,
          useValue: {
            editStudentStateFunc: jest.fn().mockResolvedValue({
              ok: true,
              message: "정상적으로 수정완료 되었습니다.",
            }) as Partial<EditStudentStateService>,
          },
        },
      ],
    }).compile();
    resolver = module.get<EditStudentStateResolver>(EditStudentStateResolver);
    editStudentStateService = module.get<EditStudentStateService>(
      EditStudentStateService,
    );
  });
  it("should be defiend", () => {
    expect(resolver).toBeDefined();
  });
  describe("editStudentState", () => {
    it("should edit a studentState and return CommonResponse", async () => {
      const context = {};
      const input: EditStudentStateDto = {
        id: 1,
        stName: "이진형",
      };

      const result = await resolver.updateStudentState(context, input);
      console.log(result);
      expect(editStudentStateService.editStudentStateFunc).toHaveBeenCalledWith(
        context,
        input,
      );
    });
  });
});
