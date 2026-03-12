import { Module } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  providers: [CategoryRepository],
  exports: [CategoryRepository],
})
export class DatabaseCategoryModule {}