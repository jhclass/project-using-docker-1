import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/prisma/prisma.service";

@Injectable()
export class ReadAlarmsService {
  constructor(private readonly client: PrismaService) {}
  async readAlarmsFunc(context: any, id: number, all: string) {
    try {
      const { user } = context.req;
      if (all === "Y") {
        const existingIds = await this.client.alarm.findMany({
          where: {
            personalTarget: {
              has: user?.id,
            },
          },
        });
        const updatePromises = existingIds.map((alarm) => {
          const updatedPersonalTarget = alarm.personalTarget.filter(
            (targetId) => targetId !== user.id,
          );
          return this.client.alarm.update({
            where: {
              id: alarm.id,
            },
            data: {
              personalTarget: updatedPersonalTarget,
            },
          });
        });
        await Promise.all(updatePromises);
        return {
          ok: true,
          message:
            "정상적으로 전체(해당매니저가 포함된 모든) 데이터가 변경되었습니다.",
        };
      } else {
        const existingId = await this.client.alarm.findUnique({
          where: {
            id,
          },
        });
        if (!existingId) {
          throw new Error("id 가 존재하지 않습니다.");
        }

        const updatedPersonalTarget = existingId.personalTarget.filter(
          (id) => id !== user?.id,
        );
        await this.client.alarm.update({
          where: {
            id,
          },
          data: {
            personalTarget: updatedPersonalTarget,
          },
        });
        return {
          ok: true,
          message: "정상적으로 (해당 매니저의 단일) 데이터가 변경되었습니다.",
        };
      }
    } catch (error) {
      console.error(error.message);
      return {
        ok: false,
        message: `에러발생! 에러메세지를 확인하세요.`,
        error: `Error:${error.message}`,
      };
    }
  }
}
