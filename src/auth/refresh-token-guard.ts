import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const refreshToken = req.headers["token"]?.replace("") || null;
    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token is missing");
    }
    return true;
  }
}
