import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from '../enum/user.enums';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (
      !req.user?.role ||
      ![RoleEnum.SUPPERADMIN, RoleEnum.ADMIN].includes(req.user.role)
    ) {
      throw new ForbiddenException('Forbidden user');
    } else {
      return true;
    }
  }
}
