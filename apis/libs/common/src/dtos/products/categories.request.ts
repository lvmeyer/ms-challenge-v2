import { IsString, Length } from 'class-validator';

export class CreateCategoryRequest {
  @IsString()
  @Length(3, 50)
  name: string;
}
