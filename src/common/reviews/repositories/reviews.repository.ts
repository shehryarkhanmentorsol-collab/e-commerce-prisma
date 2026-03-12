import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { BaseRepository, IQueryOptions } from '../../database/base.repository';
import { ReviewReadModel } from '../../../reviews/models/read-review.model';
import { CreateReviewModel } from '../../../reviews/models/create-review.model';

const reviewInclude = {
  user: { select: { id: true, name: true } },
};

@Injectable()
export class ReviewRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async create(model: CreateReviewModel, options?: IQueryOptions): Promise<ReviewReadModel> {
    const { db } = this.parseOptions(options);
    try {
      const review = await db.review.create({
        data: model.toCreateInput(),
        include: reviewInclude,
      });
      return ReviewReadModel.fromPrisma(review);
    } catch (error) {
      console.log("reviewss error", error);
      
      throw new InternalServerErrorException('Failed to create review', {
        cause: new Error(`Error creating review: ${(error as Error).message}`),
      });
    }
  }

  async findByProduct(productId: string, options?: IQueryOptions): Promise<ReviewReadModel[]> {
    const { db } = this.parseOptions(options);
    const reviews = await db.review.findMany({
      where: { productId },
      include: reviewInclude,
      orderBy: { createdAt: 'desc' },
    });
    return reviews.map((r) => ReviewReadModel.fromPrisma(r));
  }

  async delete(id: string, userId: string, options?: IQueryOptions): Promise<void> {
    const { db } = this.parseOptions(options);
    const review = await db.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException(`Review with id ${id} not found`);
    if (review.userId !== userId) throw new ForbiddenException('You can only delete your own reviews');
    try {
      await db.review.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete review', {
        cause: new Error(`Error deleting review: ${(error as Error).message}`),
      });
    }
  }
}