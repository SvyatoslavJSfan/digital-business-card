import { SlugValidationPipe } from './slug-validation.pipe';
import { BadRequestException } from '@nestjs/common';

describe('Slug validation pipe', () => {
  const slugValidationPipe = new SlugValidationPipe();

  describe('valid slug', () => {
    it('should return the valid slug', () => {
      expect(slugValidationPipe.transform('valid-slug')).toBe('valid-slug');
    });

    it('should remove spaces', () => {
      expect(slugValidationPipe.transform('   valid-slug  ')).toBe(
        'valid-slug',
      );
    });
  });

  describe('not valid slug', () => {
    it('should throw an exception if slug is an empty string', () => {
      expect(() => slugValidationPipe.transform('')).toThrow(
        BadRequestException,
      );
    });

    it('should throw an exception if slug consists of only spaces', () => {
      expect(() => slugValidationPipe.transform('   ')).toThrow(
        BadRequestException,
      );
    });

    it('should throw an exception if type of slug is not a string', () => {
      expect(() => slugValidationPipe.transform(123)).toThrow(
        BadRequestException,
      );
    });

    it('should throw an exception if no slug is provided', () => {
      expect(() => slugValidationPipe.transform(undefined)).toThrow(
        BadRequestException,
      );
    });
  });
});
