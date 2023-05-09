import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @IsOptional()
  @Length(3, 50)
  name: string;

  @IsNumber()
  @IsOptional()
  quantity: number;
}

export class UpdateOrderRequest {
  @IsString()
  @Length(3, 50)
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
