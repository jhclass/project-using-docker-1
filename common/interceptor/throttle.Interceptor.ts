import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Throttle } from "@src/public-decorator/throttle.decorator";
import { graphQLQueryPattern } from "@src/utils/regex/shared.regex";
import { Observable, tap } from "rxjs";

@Injectable()
export class ThrottleInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly reflector: Reflector,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const query = request.body.query;
    console.log("query", query);
    const operationNameMatch = query.match(graphQLQueryPattern);
    if (!operationNameMatch) {
      console.log("operationNameMatch 없음");
      return next.handle();
    }
    const operationType = operationNameMatch[1];
    const operationName = operationNameMatch[2];
    //console.log("request:", request.connection?.remoteAddress);
    const forwardedFor = request.headers?.["x-forwarded-for"];
    const ipAddr = forwardedFor
      ? forwardedFor.split(",")[0].trim() // 여러 IP가 있을 경우 첫 번째 IP 사용
      : request.connection?.remoteAddress || "Unknown";

    if (ipAddr === "Unknown") {
      console.log("ipAddr 없음");
      return next.handle();
    }

    const throttleOptions = this.reflector.get<{
      count: number;
      unit: "minute";
    }>(Throttle, context.getHandler());

    if (!throttleOptions) {
      return next.handle();
    }

    const date = new Date();
    const minute = date.getMinutes();
    const key = `${operationType}_${operationName}_${minute}`;
    const count = await this.cacheManager.get<number>(key);
    console.log(count);
    console.log(key);
    if (count && count >= throttleOptions.count) {
      throw new ForbiddenException("요청가능 횟수 초과입니다.");
    }
    return next.handle().pipe(
      tap(async () => {
        const count = (await this.cacheManager.get<number>(key)) ?? 0;
        await this.cacheManager.set(key, count + 1, 60000);
      }),
    );
  }
}
