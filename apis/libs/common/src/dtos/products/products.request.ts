import { IsString, Length } from 'class-validator';

export class CreateProductRequest {
  @IsString()
  @Length(3, 50)
  name: string;
}

export class UpdateProductRequest {
  @IsString()
  @Length(3, 50)
  name: string;
}
