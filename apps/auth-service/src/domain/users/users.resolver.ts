import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  ResolveReference,
} from '@nestjs/graphql';
import { UserEntity } from './enity/user.entity';
import {
  CreateUserInput,
  Messages,
  CreateAdminInput,
  CreateRestaurantOwnerInput,
} from '../../graphql.classes';
import { UserSignup, AdminSignup } from './dto/users.dto';
import { validate } from 'class-validator';
import { UsersService } from './users.service';
import { Logger } from '../../logger/logger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { CurrentUser, JwtPayload } from './decorator/user.decorator';

@Resolver('User')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Mutation('createUser')
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    try {
      const { email, fullName, password } = createUserInput;
      const userSignup = new UserSignup();
      userSignup.email = email;
      userSignup.fullName = fullName;
      userSignup.password = password;
      const errors = await validate(userSignup);

      if (errors.length > 0) {
        const errorsResponse: any = errors.map((val: any) => {
          return Object.values(val.constraints)[0] as string;
        });
        throw new BadRequestException(errorsResponse.join(','));
      }
      return await this.usersService.create(createUserInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Mutation('createAdmin')
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ): Promise<UserEntity> {
    let createdAdmin: UserEntity;
    try {
      const { email, fullName, password, secretKey } = createAdminInput;
      const userSignup = new AdminSignup();
      userSignup.email = email;
      userSignup.fullName = fullName;
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
      throw new BadRequestException(error.message);
    }
  }
  @Mutation('createRestaurantOwner')
  async createRestaurantOwner(
    @Args('createRestaurantOwnerInput')
    createRestaurantOwnerInput: CreateRestaurantOwnerInput,
  ): Promise<UserEntity> {
    let createdAdmin: UserEntity;
    try {
      const { email, fullName, password, secretKey } =
        createRestaurantOwnerInput;
      const userSignup = new AdminSignup();
      userSignup.email = email;
      userSignup.fullName = fullName;
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
      createdAdmin = await this.usersService.createRestaurantOwner(
        createRestaurantOwnerInput,
      );
      return createdAdmin;
    } catch (error) {
      this.logger.error(`Error creating user: ${error}`);
      throw new BadRequestException(error.message);
    }
  }
  @Query(() => [UserEntity], { name: 'users' })
  //@UseGuards(AdminGuard)
  async users(): Promise<UserEntity[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }
  @Mutation('generateSceretKey')
  @UseGuards(AdminGuard)
  async generateSceretKey(@Args('email') email: string): Promise<Messages> {
    const secretKey = await this.usersService.generateSecretKey(email);
    return { message: secretKey };
  }
  @Mutation('deleteUsers')
  async delateUsers(): Promise<Messages> {
    await this.usersService.deleteUsers();
    return { message: 'Users deleted' };
  }
  @Query(() => UserEntity, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  async user(@CurrentUser() cuser: JwtPayload): Promise<UserEntity> {
    console.log(cuser, 'cuser.');
    const user = await this.usersService.findOneByUserId(cuser.userId);
    return user;
  }
  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    this.logger.http('ResolveReference :: user');
    return await this.usersService.findOneByUserId(reference.id);
  }
}
