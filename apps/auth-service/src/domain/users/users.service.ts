import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UsersRole } from './enity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import {
  CreateUserInput,
  CreateAdminInput,
  CreateRestaurantOwnerInput,
} from '../../graphql.classes';
import * as bcrypt from 'bcryptjs';
import { Logger } from '../../logger/logger';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService,
    private logger: Logger,
  ) {}

  /**
   * Gets all the users that are registered
   *
   * @returns {Promise<UserEntity[]>}
   * @memberof UsersService
   */
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();
    this.logger.info(`Users found: ${JSON.stringify(users)}`);
    if (!users) return [];
    return users;
  }
  // this function is used to find a user by their id
  async findOneByUserId(id: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    this.logger.info(`User found: ${JSON.stringify(user.id)}`);
    if (user) return user;
    throw new Error('User not found');
  }
  // this function is used to register a user
  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const pass = await this.hashPassword(createUserInput.password);
    const saveEntity = {
      ...createUserInput,
      password: pass,
      lowercaseEmail: createUserInput.email.toLowerCase(),
    };
    const userEntity = this.userRepo.create(saveEntity);
    let user: UserEntity;
    try {
      user = await this.userRepo.save(userEntity);
    } catch (error) {
      this.logger.error(`Error creating user: ${JSON.stringify(error)}`);
      throw this.evaluateDBError(error, createUserInput);
    }
    this.logger.info(`User created: ${(user.id, user.created_at)}`);
    return user;
  }
  // this function is used to register an admin with a secret key
  async createAdmin(createAdminInput: CreateAdminInput): Promise<UserEntity> {
    const pass = await this.hashPassword(createAdminInput.password);
    const saveEntity = {
      ...createAdminInput,
      password: pass,
      lowercaseEmail: createAdminInput.email.toLowerCase(),
      permissions: [UsersRole.ADMIN],
    };
    const userEntity = this.userRepo.create(saveEntity);
    let user: UserEntity | null;
    try {
      const secretKey = this.configService.get().admin.secretKey;
      if (createAdminInput.secretKey !== secretKey) {
        throw new Error('Invalid secret key');
      }

      user = await this.userRepo.save(userEntity);
    } catch (error) {
      this.logger.error(`Error creating Admin: ${error}`);
      throw this.evaluateDBError(error, createAdminInput);
    }
    this.logger.info(`Admin created: ${JSON.stringify(user.id)}`);
    return user;
  }
  async createRestaurantOwner(
    createRestaurantOwnerInput: CreateRestaurantOwnerInput,
  ): Promise<UserEntity> {
    const generatedSecretKey = await this.generateSecretKey(
      createRestaurantOwnerInput.email,
    );
    if ((createRestaurantOwnerInput.secretKey = generatedSecretKey)) {
      const pass = await this.hashPassword(createRestaurantOwnerInput.password);
      const saveEntity = {
        ...createRestaurantOwnerInput,
        password: pass,
        lowercaseEmail: createRestaurantOwnerInput.email.toLowerCase(),
        permissions: [UsersRole.RESTAURANT_OWNER],
      };
      const userEntity = this.userRepo.create(saveEntity);
      let user: UserEntity | null;
      try {
        user = await this.userRepo.save(userEntity);
      } catch (error) {
        this.logger.error(`Error creating Restaurant Owner: ${error}`);
        throw this.evaluateDBError(error, createRestaurantOwnerInput);
      }
      this.logger.info(`Restaurant Owner created: ${user.id}`);
      return user;
    } else {
      throw new Error('Invalid secret key');
    }
  }
  // this function is used to get a users by their email
  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { lowercaseEmail: email.toLowerCase() },
    });
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }
  isAdmin(permissions: string[]): boolean {
    return permissions.includes(UsersRole.ADMIN);
  }
  async generateSecretKey(email: string) {
    const hash = await bcrypt.hash(email, 12);
    return hash;
  }
  // this function is used to hash the password
  private async hashPassword(password: any) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  private evaluateDBError(
    error: Error,
    createUserInput: CreateUserInput,
  ): Error {
    throw new Error(`Email ${createUserInput.email} is already registered`);
  }
  async deleteUsers(): Promise<any> {
    await this.userRepo.delete({});
    return 'Users deleted';
  }
}
