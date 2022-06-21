import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Req() request) {
    const userId = request.user.userId;
    if (userId === undefined) throw new NotFoundException('User Not Found');
    return this.userService.findOne(userId);
  }
}
