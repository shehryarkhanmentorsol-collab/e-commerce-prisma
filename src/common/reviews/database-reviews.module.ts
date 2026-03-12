import { Module } from '@nestjs/common';
import { ReviewRepository } from './repositories/reviews.repository';

@Module({
  providers: [ReviewRepository],
  exports: [ReviewRepository],
})
export class DatabaseReviewModule {}