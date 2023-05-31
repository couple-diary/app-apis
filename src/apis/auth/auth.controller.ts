import { Body, Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
// DTO
import { SignDto } from './dto/sign.dto';
// Interface
import { ErrorResponse } from '../response.interface';
// Method
import { Post } from '@nestjs/common';
// Service
import { AuthService } from './auth.service';
// Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signin')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 완료' })
  @ApiResponse({ status: 400, description: '로그인 실패', type: ErrorResponse })
  signin(@Body() input: SignDto): Promise<void> {
    return this.service.signin(input)
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '회원가입 완료' })
  @ApiResponse({ status: 400, description: '회원가입 실패', type: ErrorResponse })
  signup(@Body() input: SignDto): Promise<void> {
    return this.service.signup(input);
  }
}
