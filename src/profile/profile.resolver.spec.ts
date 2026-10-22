import { Test, TestingModule } from '@nestjs/testing';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { jest } from '@jest/globals';
import { Profile } from './models/profile.model';

const mockGetProfile = jest.fn<(slug: string) => Promise<Profile | null>>();

describe('ProfileResolver', () => {
  let resolver: ProfileResolver;

  beforeEach(async () => {
    mockGetProfile.mockReset();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileResolver,
        {
          provide: ProfileService,
          useValue: {
            getProfile: mockGetProfile,
          },
        },
      ],
    }).compile();

    resolver = module.get<ProfileResolver>(ProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should call ProfileService with the given slug', async () => {
    mockGetProfile.mockResolvedValue(null);

    await resolver.getProfile('john-doe');

    expect(mockGetProfile).toHaveBeenCalledWith('john-doe');
    expect(mockGetProfile).toHaveBeenCalledTimes(1);
  });

  it('should return the profile returned by ProfileService', async () => {
    const mockProfile = {
      name: 'John Doe',
      description: 'A sample profile',
      skills: [],
      experience: [],
      projects: [],
    };

    mockGetProfile.mockResolvedValue(mockProfile);

    await expect(resolver.getProfile('john-doe')).resolves.toEqual(mockProfile);
  });
});
