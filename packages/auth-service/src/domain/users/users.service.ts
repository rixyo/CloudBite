import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './enity/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { CreateUserInput, CreateAdminInput } from '../../graphql.classes';
import * as bcrypt from 'bcryptjs';
import { Logger } from '../../logger/logger';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService,
    private logger: Logger,
  ) {}
  async findOneByUsername(username: string): Promise<UserEntity | undefined> {
    const user = await this.userRepo.findOne({
      where: { lowercaseUsername: username.toLowerCase() },
    });
    if (user) {
      return user;
    }
  }

  /**
   * Gets all the users that are registered
   *
   * @returns {Promise<UserEntity[]>}
   * @memberof UsersService
   */
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();
    return users;
  }
  // this function is used to find a user by their id
  async findOneByUserId(id: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    this.logger.info(`User found: ${user}`);
    if (user) return user;
    return null;
  }
  // this function is used to register a user
  async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
    const userEntity = this.userRepo.create(createUserInput);
    const pass = await this.hashPassword(userEntity.password);
    const saveEntity = {
      ...userEntity,
      ...createUserInput,
      password: pass,
      lowercaseUsername: createUserInput.username.toLowerCase(),
      lowercaseEmail: createUserInput.email.toLowerCase(),
    };
    let user: UserEntity | null;
    try {
      user = await this.userRepo.save(saveEntity);
    } catch (error) {
      this.logger.error(`Error creating user: ${error}`);
      throw this.evaluateDBError(error, createUserInput);
    }
    this.logger.info(`User created: ${(user.id, user.created_at)}`);
    return user;
  }
  // this function is used to register an admin with a secret key
  async createAdmin(createAdminInput: CreateAdminInput): Promise<UserEntity> {
    const existingUser = await this.findOneByUsername(
      createAdminInput.username,
    );
    if (existingUser) {
      throw new Error('Username already exists');
    }
    const userEntity = this.userRepo.create(createAdminInput);
    const pass = await this.hashPassword(userEntity.password);
    const saveEntity = {
      ...userEntity,
      ...createAdminInput,
      password: pass,
      lowercaseUsername: createAdminInput.username.toLowerCase(),
      lowercaseEmail: createAdminInput.email.toLowerCase(),
      permissions: ['admin'],
    };
    let user: UserEntity | null;
    try {
      const secretKey = this.configService.get().admin.secretKey;
      if (createAdminInput.secretKey !== secretKey) {
        throw new Error('Invalid secret key');
      }

      user = await this.userRepo.save(saveEntity);
    } catch (error) {
      this.logger.error(`Error creating Admin: ${error}`);
      throw this.evaluateDBError(error, createAdminInput);
    }
    this.logger.info(`Admin created: ${(user.id, user.created_at)}`);
    return user;
  }
  async getUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { lowercaseUsername: username.toLowerCase() },
    });
    if (user) {
      return user;
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
    return permissions.includes('admin');
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
    throw new Error(
      `Username ${createUserInput.username} is already registered`,
    );
  }
  async deleteUsers(): Promise<any> {
    await this.userRepo.delete({});
    return 'Users deleted';
  }
}
