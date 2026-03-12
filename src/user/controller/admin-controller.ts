import { Controller, Get, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { JWTAuthGuard } from '../../auth/guards/jwt-auth.guards';
// import { RolesGuard } from '../../common/guards/roles.guards';
// import { Roles } from '../../common/decorators/roles.decorators';
import { UserRole } from '../enums/user.enum';
import { UserListResponseDto } from '../dto/response/user-list.response.dto';
import { Roles } from '../../common/decorators/roles.decorators';

// @ApiTags('Admin - Users')
// @ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('users')
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  // @ApiOperation({ summary: 'Get all users (ADMIN only)' })
  async getAllUsers(): Promise<UserListResponseDto[]> {
    return this.userService.findAllAsDto();
  }
}