import { Transform, Type as ValidateType } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
export class fetchRestaurantByIdDto {
  @IsUUID()
  public id!: string;
}

export class AddressDto {
  @IsDefined()
  @IsString()
  public city!: string;
  @IsDefined()
  @IsString()
  public state!: string;

  @IsDefined()
  @IsString()
  public country!: string;

  @IsDefined()
  @IsString()
  public street!: string;
}

export class SearchQueryDto {
  @IsDefined()
  @IsString()
  public search_text!: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  public page!: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  public limit!: number;
}

export class CreateRestaurantDto {
  @IsDefined()
  @IsString()
  public name!: string;

  @IsOptional()
  public description!: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  public banner!: string;

  @IsOptional()
  @IsString()
  public delivery_options!: string;

  @IsOptional()
  @IsString()
  public pickup_options!: string;

  @IsObject()
  @IsDefined()
  @ValidateType(() => AddressDto)
  public address!: AddressDto;
}
export class UpdateRestaurantDto {
  @IsDefined()
  @IsString()
  public name!: string;

  @IsOptional()
  public description!: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  public banner!: string;

  @IsOptional()
  @IsString()
  public delivery_options!: string;

  @IsOptional()
  @IsString()
  public pickup_options!: string;
}
