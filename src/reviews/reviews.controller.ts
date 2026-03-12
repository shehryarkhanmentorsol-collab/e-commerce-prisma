import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, Post, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './reviews.service';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guards';
import { CurrentUser } from '../common/decorators/current-user.decorators';
import { CreateReviewRequestDto } from './dto/request/create-review-request.dto';
import { ReviewResponseDto } from './dto/response/review-response.dto';
import { CreateReviewModel } from './models/create-review.model';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Create a review for a product' })
  async create(
    @Body() dto: CreateReviewRequestDto,
    @CurrentUser() currentUser: { id: string },
  ): Promise<ReviewResponseDto> {
    const model = CreateReviewModel.fromDto(dto, currentUser.id);
    const result = await this.reviewService.create(model);
    return ReviewResponseDto.fromModel(result);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all reviews for a product' })
  async findByProduct(@Param('productId') productId: string): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewService.findByProduct(productId);
    // later we move it to repo to clear controller.
    return reviews.map((r) => ReviewResponseDto.fromModel(r));
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete own review' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() currentUser: { id: string },
  ): Promise<void> {
    await this.reviewService.delete(id, currentUser.id);
  }
}