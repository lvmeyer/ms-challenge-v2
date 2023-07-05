import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateProductRequest {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 150)
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  image: string;
}

export class UpdateProductRequest {
  @IsString()
  @Length(3, 50)
  @IsOptional()
  name: string;

  @IsString()
  @Length(3, 150)
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  @Length(10, 150)
  image: string;
}
