import { UserInputError } from '@nestjs/apollo';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from './enity/user.entity';
import {
  CreateUserInput,
  Messages,
  CreateAdminInput,
} from '../../graphql.classes';
import { UserSignup, AdminSignup } from './dto/users.dto';
import { validate } from 'class-validator';
import { UsersService } from './users.service';
import { Logger } from '../../logger/logger';
import { ConfigService } from '../../config/config.service';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/guards/admin.guard';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  @Mutation('createUser')
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    let createdUser: UserEntity;
    try {
      const { email, username, password } = createUserInput;
      const userSignup = new UserSignup();
      userSignup.email = email;
      userSignup.fullName = username;
      userSignup.password = password;
      const errors = await validate(userSignup);

      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          this.logger.error(`Error creating user: ${val}`);
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      createdUser = await this.usersService.createUser(createUserInput);
      return createdUser;
    } catch (error) {
      this.logger.error(`Error creating user: ${error}`);
      throw new UserInputError(error.message);
    }
  }
  @Mutation('createAdmin')
  @UseGuards(AdminGuard)
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ): Promise<UserEntity> {
    let createdAdmin: UserEntity;
    try {
      const { email, username, password, secretKey } = createAdminInput;
      const userSignup = new AdminSignup();
      userSignup.email = email;
      userSignup.fullName = username;
      userSignup.password = password;
      userSignup.secretKey = secretKey;
      const errors = await validate(userSignup);

      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          this.logger.error(`Error creating user: ${val}`);
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      createdAdmin = await this.usersService.createAdmin(createAdminInput);
      return createdAdmin;
    } catch (error) {
      this.logger.error(`Error creating user: ${error}`);
      throw new UserInputError(error.message);
    }
  }
  @Query(() => [UserEntity], { name: 'users' })
  async users(): Promise<UserEntity[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }
  @Mutation('deleteUsers')
  async delateUsers(): Promise<Messages> {
    await this.usersService.deleteUsers();
    return { message: 'Users deleted' };
  }
}
