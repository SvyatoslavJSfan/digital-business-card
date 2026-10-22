import { Field, ObjectType } from '@nestjs/graphql';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType()
export class Profile {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field(() => [Skill])
  skills: Skill[];
  @Field(() => [Experience])
  experience: Experience[];
  @Field(() => [Project])
  projects: Project[];
}