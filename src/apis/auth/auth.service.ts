import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// DTO
import { SignDto } from './dto/sign.dto';
// Entity
import { User } from '../user/user.entity';
// Exception
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signin(input: SignDto): Promise<void> {
    // 로그인 정보 추출
    const { nickname, password } = input;

    // 사용자 조회
    const user: User = await User.findOneBy({ nickname });
    // 예외 처리
    if (!user) throw new NotFoundException();

    // 비밀번호 확인
    const valid: boolean = await bcrypt.compare(password, user.password);
    
    // 확인
    if (valid) console.log("로그인");
    else console.log("비밀번호 오류");
  }
  async signup(input: SignDto): Promise<void> {
    // 회원가입 정보 추출
    const { nickname, password } = input;
    // Generate salt
    const salt: string = await bcrypt.genSalt();
    // Encrypt
    const encrypted: string = await bcrypt.hash(password, salt);

    // Save
    await User.save(User.create({
      nickname,
      password: encrypted
    }));
  }
}
