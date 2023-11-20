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
export enum cuisineType {
  'indian' = 'indian',
  'italian' = 'italian',
  'chinese' = 'chinese',
}

export enum foodType {
  'veg' = 'veg',
  'non_veg' = 'non_veg',
  'vegan' = 'vegan',
}

export class RestaurantParamParamDto {
  @IsUUID()
  public id!: string;
}

export class UpdateDishItemParamDto extends RestaurantParamParamDto {
  @IsUUID()
  public dish_id!: string;
}

export class CreateRestaurantDishBodyDto {
  @IsDefined()
  @IsString()
  public name!: string;

  @IsOptional()
  @IsString()
  public description!: string;

  @IsEnum(cuisineType)
  public cuisine_type!: string;

  @IsEnum(mealType)
  public meal_type!: string;

  @IsOptional()
  @IsString()
  public category!: string;

  @IsOptional()
  @IsString()
  public ingredients!: string;

  @IsEnum(foodType)
  public food_type!: string;

  @IsNumber()
  public price!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public thumbnails!: string[];
}
