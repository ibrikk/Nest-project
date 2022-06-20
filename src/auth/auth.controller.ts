import {
  Body,
  Controller,
  Delete,
  Ip,
  NotFoundException,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RefreshTokenDto from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';
import { TokenExceptionFilter } from 'src/api/error-filters/token-exception.filter';
import { UserExceptionFilter } from 'src/api/error-filters/user-exception-filter';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseFilters(UserExceptionFilter)
  async login(@Req() request, @Ip() ip: string, @Body() body: LoginDto) {
    const isLoginSuccessful = await this.authService.login(
      body.email,
      body.password,
      {
        ipAddress: ip,
        userAgent: request.headers['user-agent'],
      },
    );
    if (isLoginSuccessful === undefined) throw new NotFoundException();
    return isLoginSuccessful;
  }

  @UseFilters(TokenExceptionFilter)
  @Post('refresh')
  async refreshToken(@Body() body: RefreshTokenDto) {
    const hasBeenRetrieved = await this.authService.refresh(body.refreshToken);
    if (hasBeenRetrieved === undefined)
      throw new NotFoundException();
  }

  @UseFilters(TokenExceptionFilter)
  @Delete('logout')
  async logout(@Body() body: RefreshTokenDto) {
    const isLoggedOut = await this.authService.logout(body.refreshToken);
    if (isLoggedOut === undefined) throw new NotFoundException();
    return isLoggedOut;
  }
}
