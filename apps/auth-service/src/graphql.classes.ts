
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginUserInput {
    email?: Nullable<string>;
    password: string;
}

export class CreateUserInput {
    fullName: string;
    email: string;
    password: string;
}

export class CreateAdminInput {
    fullName: string;
    email: string;
    password: string;
    secretKey: string;
}

export class CreateRestaurantOwnerInput {
    fullName: string;
    email: string;
    password: string;
    secretKey: string;
}

export class UpdateUserInput {
    fullName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<UpdatePasswordInput>;
    enabled?: Nullable<boolean>;
}

export class UpdatePasswordInput {
    oldPassword: string;
    newPassword: string;
}

export abstract class IMutation {
    abstract login(loginUserInput: LoginUserInput): LoginResult | Promise<LoginResult>;

    abstract refreshToken(): string | Promise<string>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): User | Promise<User>;

    abstract deleteUsers(): Messages | Promise<Messages>;

    abstract createAdmin(createAdminInput?: Nullable<CreateAdminInput>): User | Promise<User>;

    abstract createRestaurantOwner(createRestaurantOwnerInput?: Nullable<CreateRestaurantOwnerInput>): User | Promise<User>;

    abstract updateUser(fieldsToUpdate: UpdateUserInput, email?: Nullable<string>): User | Promise<User>;

    abstract generateSceretKey(email?: Nullable<string>): Messages | Promise<Messages>;

    abstract addAdminPermission(email: string): User | Promise<User>;

    abstract removeAdminPermission(email: string): User | Promise<User>;

    abstract resetPassword(email: string, code: string, password: string): User | Promise<User>;
}

export class LoginResult {
    user: User;
    token: string;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(): User | Promise<User>;

    abstract forgotPassword(email?: Nullable<string>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Messages {
    message: string;
}

export class User {
    id: string;
    fullName: string;
    email: string;
    permissions: string[];
    created_at: Date;
    updated_at: Date;
}

type Nullable<T> = T | null;
