import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Req() request) {
    const userId = request.user.userId;
    if (!userId || undefined) throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: 'User was not found!',
    }, HttpStatus.NOT_FOUND);
    return this.userService.findOne(userId);
  }
}
