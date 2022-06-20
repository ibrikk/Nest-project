import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { UserExceptionFilter } from './error-filters/user-exception-filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UseFilters(UserExceptionFilter)
  @Get()
  getUsers(@Req() request) {
    const userId = request.user.userId;
    if (!userId || undefined) throw new NotFoundException();
    return this.userService.findOne(userId);
  }
}
