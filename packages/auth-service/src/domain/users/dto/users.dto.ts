import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class UserSignup {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;

  @IsDefined()
  @MinLength(6)
  @IsString()
  public fullName!: string;

  @IsDefined()
  @MinLength(6)
  @IsString()
  public password!: string;
}
export class AdminSignup {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email!: string;

  @IsDefined()
  @MinLength(6)
  @IsString()
  public fullName!: string;

  @IsDefined()
  @MinLength(6)
  @IsString()
  public password!: string;
  @IsDefined()
  @IsString()
  public secretKey!: string;
}
