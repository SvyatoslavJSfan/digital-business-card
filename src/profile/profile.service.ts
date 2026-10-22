import { Injectable } from '@nestjs/common';
import { Profile } from './models/profile.model';
import { SkillLevel } from './models/skill.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  async getProfile(slug: string): Promise<Profile | null> {
    const profile = await this.prismaService.profile.findUnique({
      where: { slug },
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });

    if (!profile) {
      return null;
    }

    return {
      ...profile,
      skills: profile.skills.map((skill) => ({
        ...skill,
        level: SkillLevel[skill.level],
      })),
      experience: profile.experience.map((experience) => ({
        ...experience,
        startDate: experience.startDate.toISOString().slice(0, 10),
        endDate: experience.endDate?.toISOString().slice(0, 10) ?? null,
      })),
    };
  }
}
