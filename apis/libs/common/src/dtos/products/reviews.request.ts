import { IsDefined, IsString, Length } from 'class-validator';

export class CreateReviewRequest {
  @IsString()
  @Length(3, 150)
  description: string;

  @IsString()
  @IsDefined()
  productId: string;

  @IsDefined()
  @IsDefined()
  rating: number;
}
