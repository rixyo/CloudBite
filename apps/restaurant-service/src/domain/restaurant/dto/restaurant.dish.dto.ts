import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
