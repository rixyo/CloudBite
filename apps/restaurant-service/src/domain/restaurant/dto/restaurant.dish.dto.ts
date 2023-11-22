import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum mealType {
  'breakfast' = 'breakfast',
  'lunch' = 'lunch',
  'dinner' = 'dinner',
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

  @IsEnum(mealType)
  public meal_type!: string;

  @IsOptional()
  @IsString()
  public ingredients!: string;

  @IsNumber()
  public price!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public thumbnails!: string[];
}
