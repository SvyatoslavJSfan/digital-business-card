import { Args, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';
import { SlugValidationPipe } from '../common/pipes/slug-validation.pipe';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { nullable: true })
  getProfile(
    @Args('slug', { type: () => String }, SlugValidationPipe) slug: string,
  ) {
    return this.profileService.getProfile(slug);
  }
}
