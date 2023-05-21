import { IsNumber, IsString } from 'class-validator';

export class CreateBasketRequest {
  @IsNumber()
  price: number;
}

export class UpdateBasketRequest {
  @IsNumber()
  price: number;
}

export class AddProductToBasketRequest {
  @IsString()
  productId: string;
}

export class RemoveProductToBasketRequest {
  @IsString()
  productId: string;
}
