import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class TypeOrmCustonModule {
  static register() {
    return {
      module: TypeOrmCustonModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            return {
              type: 'postgres',
              host: 'database',
              port: configService.get<number>('POSTGRES_PORT'),
              username: configService.get<string>('POSTGRES_USER'),
              password: configService.get<string>('POSTGRES_PASSWORD'),
              database: configService.get<string>('POSTGRES_DB'),
              autoLoadEntities: true,
              synchronize: true,
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
