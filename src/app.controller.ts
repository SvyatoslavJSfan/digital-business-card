import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile/profile.service';
import { AppService } from './app.service';
import { Profile } from './profile/models/profile.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile/:slug')
  getProfile(@Param('slug') slug: string): Promise<Profile | null> {
    return this.profileService.getProfile(slug);
  }
}
