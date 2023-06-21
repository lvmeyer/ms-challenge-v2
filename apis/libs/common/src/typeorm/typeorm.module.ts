import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class TypeOrmCustomModule {
  static register() {
    return {
      module: TypeOrmCustomModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => {
            return {
              type: 'mysql',
              host: configService.get<string>('MYSQL_HOST'),
              port: 3306,
              username: configService.get<string>('MYSQL_USER'),
              password: configService.get<string>('MYSQL_PASSWORD'),
              database: configService.get<string>('MYSQL_DATABASE'),
              autoLoadEntities: true,
              synchronize: false,
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
