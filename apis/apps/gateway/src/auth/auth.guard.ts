// import { Request } from 'express';
// // import { JwtService } from '@nestjs/jwt';
// import { Reflector } from '@nestjs/core';
// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   Injectable,
// } from '@nestjs/common';

// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   public constructor(
//     // private readonly jwtService: JwtService,
//     private readonly usersService: UsersService,
//     private reflector: Reflector,
//   ) {}

//   // public async canActivate(context: ExecutionContext): Promise<boolean> {
//   //   const request = context.switchToHttp().getRequest<Request>();

//   //   const authorizationHeader = request.get('Authorization');

//   //   if (!authorizationHeader) {
//   //     throw new BadRequestException('Authorization header is missing');
//   //   }

//   //   const [authorizationType, token] = authorizationHeader.split(' ');

//   //   if (authorizationType !== 'Bearer') {
//   //     throw new BadRequestException('Authorization should be Bearer');
//   //   }

//   //   if (!token) {
//   //     throw new BadRequestException('Token is missing');
//   //   }

//   //   try {
//   //     const role = this.reflector.get<string | undefined>(
//   //       'role',
//   //       context.getHandler(),
//   //     );
//   //     const { id } = this.jwtService.verify(token, {
//   //       secret: process.env.JWT_SECRET,
//   //     });

//   //     const user = await this.usersService.getUserById(id);

//   //     if (!user) {
//   //       throw new BadRequestException('Invalid user');
//   //     }

//   //     if (role && user.role !== role) {
//   //       throw new BadRequestException('Invalid role');
//   //     }

//   //     return true;
//   //   } catch (error) {
//   //     if (error instanceof JsonWebTokenError) {
//   //       throw new BadRequestException('Invalid token');
//   //     }

//   //     throw error;
//   //   }
//   // }
// }
