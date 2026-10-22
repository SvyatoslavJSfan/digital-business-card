import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

registerEnumType(SkillLevel, {
  name: 'SkillLevel',
  description: 'The level of proficiency in a skill',
});

@ObjectType()
export class Skill {
  @Field()
  name: string;
  @Field(() => SkillLevel)
  level: SkillLevel;
}