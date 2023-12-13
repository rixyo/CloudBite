import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum dishType {
  'pizza' = 'pizza',
  'biryani' = 'biryani',
  'burgers' = 'burgers',
}
export class RestaurantParamParamDto {
  @IsUUID()
  public id!: string;
}

export class UpdateDishItemParamDto extends RestaurantParamParamDto {
  @IsUUID()
  public dish_id!: string;
}

export class CreateRestaurantDishDto {
  @IsDefined()
  @IsString()
  public name!: string;

  @IsOptional()
  @IsString()
  public description!: string;

  @IsEnum(dishType)
  public dish_type!: string;

  @IsString()
  @IsNotEmpty()
  public price!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public thumbnails!: string[];
}
