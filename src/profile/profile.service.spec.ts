import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { jest } from '@jest/globals';

type MockExperience = {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
};

type MockProfile = {
  id: number;
  slug: string;
  name: string;
  description: string;
  skills: unknown[];
  experience: MockExperience[];
  projects: unknown[];
};

const mockFunction = jest.fn<() => Promise<MockProfile | null>>();

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    mockFunction.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: PrismaService,
          useValue: {
            profile: {
              findUnique: mockFunction,
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if profile is not found', async () => {
    mockFunction.mockResolvedValue(null);
    await expect(service.getProfile('unknown-slug')).resolves.toBeNull();
  });

  it('should return a profile if slug is valid', async () => {
    const argument = {
      where: { slug: 'valid-slug' },
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    };
    const mockProfile = {
      id: 1,
      slug: 'valid-slug',
      name: 'John Doe',
      description: 'A sample profile',
      skills: [
        {
          id: 1,
          name: 'TypeScript',
          level: 'BEGINNER',
        },
      ],
      experience: [
        {
          id: 1,
          company: 'Company A',
          position: 'Developer',
          description: 'Worked on various projects',
          startDate: new Date('2020-01-01'),
          endDate: new Date('2021-01-01'),
        },
      ],
      projects: [],
    };
    const expectedProfile = {
      ...mockProfile,
      experience: [
        {
          id: 1,
          company: 'Company A',
          position: 'Developer',
          description: 'Worked on various projects',
          startDate: '2020-01-01',
          endDate: '2021-01-01',
        },
      ],
      skills: [
        {
          id: 1,
          name: 'TypeScript',
          level: 'Beginner',
        },
      ],
    };
    mockFunction.mockResolvedValue(mockProfile);

    await expect(service.getProfile('valid-slug')).resolves.toEqual(
      expectedProfile,
    );
    expect(mockFunction).toHaveBeenCalledWith(argument);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should process the null end date properly', async () => {
    const mockProfile = {
      id: 1,
      slug: 'valid-slug',
      name: 'John Doe',
      description: 'A sample profile',
      skills: [
        {
          id: 1,
          name: 'TypeScript',
          level: 'BEGINNER',
        },
      ],
      experience: [
        {
          id: 1,
          company: 'Company A',
          position: 'Developer',
          description: 'Worked on various projects',
          startDate: new Date('2020-01-01'),
          endDate: null,
        },
      ],
      projects: [],
    };
    const expectedProfile = {
      ...mockProfile,
      experience: [
        {
          id: 1,
          company: 'Company A',
          position: 'Developer',
          description: 'Worked on various projects',
          startDate: '2020-01-01',
          endDate: null,
        },
      ],
      skills: [
        {
          id: 1,
          name: 'TypeScript',
          level: 'Beginner',
        },
      ],
    };
    mockFunction.mockResolvedValue(mockProfile);

    await expect(service.getProfile('valid-slug')).resolves.toEqual(
      expectedProfile,
    );
  });
});
