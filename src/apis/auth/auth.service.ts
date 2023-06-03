import { Injectable } from '@nestjs/common';
// Crypt
import * as bcrypt from 'bcrypt';
// DTO
import { SignDto } from './dto/sign.dto';
// Entity
import { User } from '../user/user.entity';
// Exception
import { BadRequestException } from '@nestjs/common';
// Service
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  /**
   * [Method] 회원가입
   * @param input 사용자 정보
   */
  async signup(input: SignDto): Promise<void> {
    // 사용자 정보 추출
    const { nickname, password } = input;
    // 닉네임 중복 확인을 위한 조회
    const user: User = await this.userService.findOneByNickname(nickname);
    // 닉네임이 존재하는 경우
    if (user) throw new BadRequestException('이미 존재하는 닉네임이예요.');

    // Salt 생성
    const salt: string = await bcrypt.genSalt();
    // 비밀번호 암호화
    const encrypted: string = await bcrypt.hash(password, salt);

    // 사용자 생성
    return await this.userService.create(nickname, encrypted);
  }

  async slient(): Promise<void> {

  }
}
