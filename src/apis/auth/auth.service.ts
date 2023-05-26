import { Injectable } from '@nestjs/common';
// DTO
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class AuthService {
  async signup(input: CreateUserDto): Promise<void> {
    console.log(input);
  }
}
