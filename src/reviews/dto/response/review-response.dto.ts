import { ReviewReadModel } from "../../models/read-review.model";

export class ReviewResponseDto {
  static fromModel(model: ReviewReadModel): ReviewResponseDto {
    const dto = new ReviewResponseDto();
    dto.id = model.id;
    dto.comment = model.comment;
    dto.rating = model.rating;
    dto.userId = model.userId;
    dto.productId = model.productId;
    dto.user = model.user;
    dto.createdAt = model.createdAt;
    return dto;
  }
  id: string;
  comment: string;
  rating: number;
  userId: string;
  productId: string;
  user: any;
  createdAt: Date;
}