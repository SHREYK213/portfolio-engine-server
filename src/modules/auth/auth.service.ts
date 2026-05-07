import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { AuthPayload } from './dto/auth-payload.object';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async signup(input: SignupInput): Promise<AuthPayload> {
        const exisitingUser = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if( exisitingUser){
            throw new ConflictException('User already exists');
        }

        const passwordHash = await bcrypt.hash(input.password, 12);

        const user = await this.prisma.user.create({
            data: {
                email: input.email,
                name: input.name,
                passwordHash
            },
        });

        return {
            accessToken: await this.createAccessToken(user.id),
            user: {
                id: user.id,
                email: user.email,
                name: user.name ?? undefined
            },
        };
    }


    async login(input: LoginInput): Promise<AuthPayload> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if(!user){
            throw new UnauthorizedException('Invalid email or password')
        }

        const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash)

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid email or password')
        }

        return {
            accessToken: await this.createAccessToken(user.id),
            user: {
                id: user.id,
                email: user.email,
                name: user.name ?? undefined,
            },
        };
    }

    async me(userId: string): Promise<AuthPayload['user']>{
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: userId
            },
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
        };
    }

    private createAccessToken(userId: string): Promise<string>{
        return this.jwtService.signAsync({
            sub: userId
        })
    }

}
