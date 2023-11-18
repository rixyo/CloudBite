import { Inject, Injectable } from '@nestjs/common/decorators';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserEntity } from '../users/enity/user.entity';
import { forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';
import { LoginResult, LoginUserInput } from '../../graphql.classes';
import * as bcrypt from 'bcryptjs';
import { Logger } from '../../logger/logger';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private logger: Logger,
  ) {}

  async validateUserByPassword(
    loginAttempt: LoginUserInput,
  ): Promise<LoginResult | undefined> {
    let userToAttempt: UserEntity | undefined;
    if (loginAttempt.email) {
      userToAttempt = await this.usersService.findOneByEmail(
        loginAttempt.email,
      );
    }
    let isMatch = false;
    try {
      isMatch = await this.comparePassword(
        loginAttempt.password,
        userToAttempt.password,
      );
    } catch (error) {
      this.logger.error(`Error validating user: ${JSON.stringify(error)}`);
      return undefined;
    }

    if (isMatch) {
      // If there is a successful match, generate a JWT for the user
      const token = this.createJwt(userToAttempt!).token;
      const result: any = {
        user: userToAttempt!,
        token,
      };
      userToAttempt.updated_at = new Date();
      userToAttempt.save();
      return result;
    }
    return null;
  }
  createJwt(user: UserEntity): { data: JwtPayload; token: string } {
    const expiresIn = this.configService.get().auth.expireIn as number;
    let expiration: Date | undefined;
    if (expiresIn) {
      expiration = new Date();
      expiration.setTime(expiration.getTime() + expiresIn * 1000);
    }
    const data: JwtPayload = {
      userId: user.id,
      permissions: user.permissions,
      email: user.email,
      expiration,
    };

    const jwt = this.jwtService.sign(data);

    return {
      data,
      token: jwt,
    };
  }
  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<UserEntity | undefined> {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByEmail(payload.email);
    // Ensure the user exists and their account isn't disabled
    if (user) {
      user.updated_at = new Date();
      user.save();
      return user;
    }

    return undefined;
  }
}
