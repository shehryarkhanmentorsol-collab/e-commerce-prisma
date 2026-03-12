import { PrismaService } from './prisma.service';

export interface IQueryOptions {
  // Allow Prisma transaction client if available
  tx?: any;
}

export abstract class BaseRepository {
  constructor(protected readonly prisma: PrismaService) {}

  protected parseOptions(options?: IQueryOptions): { db: PrismaService | any } {
    return {
      db: options?.tx ?? this.prisma,
    };
  }
}