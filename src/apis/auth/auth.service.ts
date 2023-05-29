import { Injectable } from '@nestjs/common';
// DTO
import { SignDto } from './dto/sign.dto';

@Injectable()
export class AuthService {
  async signin(input: SignDto): Promise<void> {
    console.log(input);
  }
  async signup(input: SignDto): Promise<void> {
    console.log(input);
  }
}
