import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export type CurrentUser = {
    userId: string;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): CurrentUser =>{
        const gqlContext = GqlExecutionContext.create(context);

        return gqlContext.getContext().req.user
    }
)

// we get me(@CurrentUser() user: CurrentUser)