import { Prisma } from "@prisma/client";
import { CreateReviewRequestDto } from "../dto/request/create-review-request.dto";

export class CreateReviewModel {
  static fromDto(dto: CreateReviewRequestDto, userId: string): CreateReviewModel {
    const model = new CreateReviewModel();
    model.comment = dto.comment;
    model.rating = dto.rating;
    model.productId = dto.productId;
    model.userId = userId;
    return model;
  }

  toCreateInput(): Prisma.ReviewCreateInput {
    return {
      comment: this.comment,
      rating: this.rating,
      user: { connect: { id: this.userId } },
      product: { connect: { id: this.productId } },
    };
  }

  comment: string;
  rating: number;
  productId: string;
  userId: string;
}