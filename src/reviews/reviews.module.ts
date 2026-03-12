import { Module } from '@nestjs/common';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';
import { DatabaseReviewModule } from '../common/reviews/database-reviews.module';

@Module({
  imports: [DatabaseReviewModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}