import { IsDefined, IsString } from 'class-validator';

export class LoginRequest {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;
}

export class RegisterRequest {
  @IsDefined()
  @IsString()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsDefined()
  @IsString()
  firstname: string;

  @IsDefined()
  @IsString()
  lastname: string;
}
