import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
// DTO
import { CreateUserDto } from './dto/create.dto';
// Service
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('인증')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signup(@Body() input: CreateUserDto): Promise<void> {
    return this.service.signup(input);
  }
}
