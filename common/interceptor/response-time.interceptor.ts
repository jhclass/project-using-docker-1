import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable, tap } from "rxjs";

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const reqTime = Date.now();
    const req = context.switchToHttp().getRequest();
    const gqlContext = GqlExecutionContext.create(context);
    const gqlReq = gqlContext.getContext().req;

    const query = gqlReq.body.query;
    const operationNameMatch = query.match(/(query|mutation)\s+(\w+)/);
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
        console.log("query찾을 수 없음.");
      }
      console.log("req", req);
    } catch (error) {
      console.error(error.message);
    }
  }
}
