import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from '../../graphql.classes';
import { Logger } from '../../logger/logger';
import { AuthenticationError } from 'apollo-server-core';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwtauth.guard';
import { UserEntity } from '../users/enity/user.entity';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}
  @Query('login')
  async loging(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const result = await this.authService.validateUserByPassword(
      loginUserInput,
    );
    if (!result)
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    this.logger.log(`User logged in: ${JSON.stringify(result.user.id)}`);
    return result;
  }
  @Query('refreshToken')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context('req') request: any): Promise<string> {
    const user: UserEntity = request.user;
    if (!user)
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    const result = this.authService.createJwt(user);
    if (result) return result.token;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }
}
