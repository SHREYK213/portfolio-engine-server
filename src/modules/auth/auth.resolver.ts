import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthPayload } from './dto/auth-payload.object';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { AuthService } from './auth.service';


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
}