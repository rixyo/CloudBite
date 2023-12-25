import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class WithdrawDto {
  @IsDefined()
  @IsEmail()
  public email!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public amount!: string;
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  public branch_name!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public passport_nid!: string;
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  public account_number!: string;
}
