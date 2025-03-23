import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { RoleEnum } from '../enum/user.enums';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user?.role && req.user?.role !== RoleEnum.SUPPERADMIN) {
      throw new ForbiddenException('Forbidden user');
    }
    return true;
  }
}
