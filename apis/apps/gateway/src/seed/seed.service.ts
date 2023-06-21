import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeedService {
  public constructor(private readonly usersService: UsersService) {}

  public async seed() {
    await this.usersService.seed();
  }
}
