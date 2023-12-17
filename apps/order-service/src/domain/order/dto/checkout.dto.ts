import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCheckoutDto {
  @IsArray()
  @IsNotEmpty()
  orderItems: any[];
}
