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
  basketId: string;

  @IsString()
  productId: string;
}

export class RemoveProductFromBasketRequest {
  @IsString()
  basketId: string;

  @IsString()
  productId: string;
}
