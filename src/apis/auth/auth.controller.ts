import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
// DTO
import { SignDto } from './dto/sign.dto';
// Method
import { Post } from '@nestjs/common';
// Service
import { AuthService } from './auth.service';
// Swagger
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('인증')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signin')
  @UsePipes(ValidationPipe)
  signin(@Body() input: SignDto): Promise<void> {
    return this.service.signin(input)
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  signup(@Body() input: SignDto): Promise<void> {
    return this.service.signup(input);
  }
}
