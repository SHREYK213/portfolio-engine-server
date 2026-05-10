import { Field, ObjectType } from '@nestjs/graphql';
import { AuthUser } from './auth-user.object';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => AuthUser)
  user: AuthUser;
}
