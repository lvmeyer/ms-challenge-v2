import { IsNumber } from 'class-validator';

export class CreateConfigRequest {
  @IsNumber()
	price: number;
}