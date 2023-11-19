import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from 'src/config/config.service';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  isAdmin(roles: string[]) {
    return roles.includes('admin');
  }
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const secretKey = this.configService.get().auth.jwtSecret;
    const token = this.getTokenFromRequest(req);
    if (!token)
      throw new AuthenticationError(
        'Could not authenticate with token or user does not have permissions',
      );
    const user = jwt.verify(token, secretKey) as any;
    req.user = user;
    if (req.user) {
      const user = <any>req.user;
      if (this.isAdmin(user.permissions)) return true;
    }
    throw new AuthenticationError(
      'Could not authenticate with token or user does not have permissions',
    );
  }
  private getTokenFromRequest(req: any): string | null {
    return req.headers.authorization?.split('Bearer ')[1] || null;
  }
}
