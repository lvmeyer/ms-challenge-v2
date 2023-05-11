import { IsNumber } from 'class-validator';

export class CreateBasketRequest {
  @IsNumber()
  price: number;
}

export class UpdateBasketRequest {
  @IsNumber()
  price: number;
}
