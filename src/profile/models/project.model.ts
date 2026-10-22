import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Project {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => String, { nullable: true })
  repositoryUrl: string | null;
  @Field(() => String, { nullable: true })
  demoUrl: string | null;
}