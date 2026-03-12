import { GetProductsRequestDto } from "../dto/request/get-product-request.dto";

export class GetProductsModel {
  static fromDto(dto: GetProductsRequestDto): GetProductsModel {
    const model = new GetProductsModel();
    model.categoryId = dto.categoryId;
    model.search = dto.search;
    model.page = dto.page ?? 1;
    model.limit = dto.limit ?? 10;
    return model;
  }
  categoryId?: string;
  search?: string;
  page: number;
  limit: number;
}