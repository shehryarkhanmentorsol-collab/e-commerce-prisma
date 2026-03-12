interface PrismaReviewUser {
  id: string;
  name: string;
}

interface PrismaReview {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  user: PrismaReviewUser;
}

export class ReviewUserModel {
  id: string;
  name: string;
}

export class ReviewReadModel {
  static fromPrisma(data: PrismaReview): ReviewReadModel {
    const model = new ReviewReadModel();
    model.id = data.id;
    model.comment = data.comment;
    model.rating = data.rating;
    model.userId = data.userId;
    model.productId = data.productId;
    model.user = { id: data.user.id, name: data.user.name };
    model.createdAt = data.createdAt;
    return model;
  }

  id: string;
  comment: string;
  rating: number;
  userId: string;
  productId: string;
  user: ReviewUserModel;
  createdAt: Date;
}