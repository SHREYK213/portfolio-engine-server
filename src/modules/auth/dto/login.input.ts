import { Field, InputType } from '@nestjs/graphql';
import {
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  identifier: string;

  @Field()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
