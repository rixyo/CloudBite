import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCheckoutDto {
  @IsNotEmpty()
  @IsArray()
  orderItemsIds: string[];
  @IsNotEmpty()
  @IsArray()
  orderItemsQuantities: number[];
  @IsNotEmpty()
  @IsArray()
  orderItemsPrices: string[];
  @IsNotEmpty()
  @IsArray()
  orderItemsNames: string[];
}
