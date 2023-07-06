import { IsString, Length } from 'class-validator';

export class CreateSubCategoryRequest {
  @IsString()
  @Length(3, 50)
  name: string;
}
