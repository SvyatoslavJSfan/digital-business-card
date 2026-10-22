import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SlugValidationPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }

    throw new BadRequestException('Slug must be a non-empty string');
  }
}
