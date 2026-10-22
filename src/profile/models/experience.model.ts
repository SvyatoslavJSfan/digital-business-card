import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Experience {
  @Field()
  company: string;
  @Field()
  position: string;
  @Field()
  description: string;
  @Field()
  startDate: string;
  @Field(() => String, { nullable: true })
  endDate: string | null;
}