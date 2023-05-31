import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
// DTO
import { SignDto } from './dto/sign.dto';
// Entity
import { RawUser } from '../user/user.entity';
// Exception
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
  /**
   * [Method] 로그인
   * @param input 로그인 정보
   */
  async signin(input: SignDto): Promise<void> {
    // 로그인 정보 추출
    const { nickname, password } = input;

    // 사용자 조회
    const user: RawUser = await this.findUserByName(nickname);
    // 예외 처리
    if (!user) throw new BadRequestException();
    // 비밀번호 불일치 처리
    else if (!await bcrypt.compare(password, user.password)) throw new BadRequestException();
  }
  /**
   * [Method] 회원가입
   * @param input 회원가입을 위한 사용자 정보
   * @returns 요청 결과
   */
  async signup(input: SignDto): Promise<void> {
    // 회원가입 정보 추출
    const { nickname, password } = input;

    // 닉네임 사용 여부 확인을 위한 조회
    const user: RawUser = await this.findUserByName(nickname);
    // 사용 중인 닉네임일 경우
    if (user) throw new BadRequestException('이미 다른 사람이 사용하고 있어요.');

    try {
      // Salt 생성
      const salt: string = await bcrypt.genSalt();
      // 비밀번호 암호화
      const encrypted: string = await bcrypt.hash(password, salt);
      // 사용자 정보 저장
      await RawUser.save(RawUser.create({
        id: uuid(),
        nickname,
        password: encrypted
      }));
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * [Internal Method] 닉네임을 이용한 사용자 조회
   * @param nickname 닉네임
   * @returns 조회 결과
   */
  private async findUserByName(nickname: string): Promise<RawUser> {
    return await RawUser.findOneBy({ nickname });
  }
}
