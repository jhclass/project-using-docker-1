import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { graphQLQueryPattern } from "@src/utils/regex/shared.regex";
import { Observable, tap } from "rxjs";

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const reqTime = Date.now();
    if ((context.getType() as string) === "http") {
      const httpRequest = context.switchToHttp().getRequest();

      return next.handle().pipe(
        tap(() => {
          const respTime = Date.now();
          const diff = respTime - reqTime;
          console.log(
            `[REST ${httpRequest.method} ${httpRequest.url}] ${diff}ms`,
          );
        }),
      );
    }
    if ((context.getType() as string) === "graphql") {
      const gqlContext = GqlExecutionContext.create(context);
      const gqlReq = gqlContext.getContext().req;

      const query = gqlReq.body.query;
      const operationNameMatch = query.match(graphQLQueryPattern);
      try {
        if (operationNameMatch) {
          const operationType = operationNameMatch[1];
          const operationName = operationNameMatch[2];

          return next.handle().pipe(
            tap(() => {
              const respTime = Date.now();
              const diff = respTime - reqTime;
              console.log(`[${operationType} ${operationName}] ${diff}ms`);
            }),
          );
        } else {
          console.log("query 찾을 수 없음.");
          return next.handle();
        }
      } catch (error) {
        console.error(error.message);
        return next.handle();
      }
    }
  }
}
