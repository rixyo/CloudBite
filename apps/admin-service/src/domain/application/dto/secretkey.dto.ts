import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SecretKeyDto {
  @IsDefined()
  @IsEmail()
  public email!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public restaurant_license!: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public mobile_number!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public passport_nid!: string;
}
