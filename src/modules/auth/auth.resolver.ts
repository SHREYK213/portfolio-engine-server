import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthPayload } from './dto/auth-payload.object';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AuthUser } from './dto/auth-user.object';


@Resolver()
export class AuthResolver {
    constructor( private readonly authService: AuthService){}

    @Mutation(()=> AuthPayload)
    signup(@Args('input') input: SignupInput): Promise<AuthPayload> {
        return this.authService.signup(input);
    }

    @Mutation(()=> AuthPayload)
    login(@Args('input') input: LoginInput): Promise<AuthPayload> {
        return this.authService.login(input)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => AuthUser)
    me(@CurrentUser() user: CurrentUser): Promise<AuthUser> {
    return this.authService.me(user.userId);
}
}