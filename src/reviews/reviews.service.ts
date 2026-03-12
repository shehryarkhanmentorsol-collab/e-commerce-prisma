import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from '../common/reviews/repositories/reviews.repository';
import { ReviewReadModel } from './models/read-review.model';
import { CreateReviewModel } from './models/create-review.model';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async create(model: CreateReviewModel): Promise<ReviewReadModel> {
    try {
      return await this.reviewRepository.create(model);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create review');
    }
  }

  async findByProduct(productId: string): Promise<ReviewReadModel[]> {
    try {
      return await this.reviewRepository.findByProduct(productId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve reviews');
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    try {
      await this.reviewRepository.delete(id, userId);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete review');
    }
  }
}