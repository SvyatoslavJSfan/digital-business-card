import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService],
  imports: [PrismaModule],
})
export class ProfileModule {}
