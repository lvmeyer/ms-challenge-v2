import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email: string;

  @IsDefined()
  @IsString()
  public password: string;

  // @IsDefined()
  // @IsString()
  // firstname: string;

  // @IsDefined()
  // @IsString()
  // lastname: string;
}

export class UpdateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  public email: string;
}

export class UpdateProfileRequest {
  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;
}

export class UpdatePasswordRequest {
  @IsDefined()
  @IsString()
  public password: string;
}
