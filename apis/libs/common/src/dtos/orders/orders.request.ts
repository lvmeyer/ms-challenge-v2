import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @Length(3, 50)
  name: string;
}

export class UpdateOrderRequest {
  @IsString()
  @Length(3, 50)
  name: string;
}
