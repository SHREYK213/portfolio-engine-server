import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configureService: ConfigService) => ({
        secret: configureService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configureService.getOrThrow('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
