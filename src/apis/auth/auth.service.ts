import { Injectable } from '@nestjs/common';
// Config
import { ConfigService } from '@nestjs/config';
// Crypt
import { compare, genSalt, hash } from 'bcrypt';
// DTO
import { SignDto, TokenDto } from './dto/sign.dto';
// Entity
import { User } from '../user/user.entity';
// Exception
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
// JWT
import { JwtService } from '@nestjs/jwt';
import type { JwtSignOptions } from '@nestjs/jwt'
// Service
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService, private jwtService: JwtService, private userService: UserService) {}

  /**
   * [Method] 로그인
   * @param input 사용자 정보
   * @returns 토큰(Token)
   */
  async signin(input: SignDto): Promise<TokenDto> {
    // 사용자 정보 추출
    const { nickname, password } = input;
    // 사용자 조회
    const user: User = await this.userService.findOneByNickname(nickname, false);
    // 예외 처리
    if (!user || !(await compare(password, user.password))) throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않아요. 입력하신 내용을 다시 확인해주세요.');

    // 액세스 토큰 생성
    const accessToken: string = this.generateAccessToken(user.id);

    // Payload 생성
    const payload: any = { id: user.id };
    // 토큰 옵션
    const options: JwtSignOptions = { expiresIn: this.configService.get<number>('REFRESH_TOKEN_EXPIRES') | 1296000, secret: this.configService.get<string>('REFRESH_TOKEN_SECRET')  };
    // 리프레쉬 토큰 생성
    const refreshToken: string = this.jwtService.sign(payload, options);

    // 토큰 반환
    return { accessToken, refreshToken };
  }
  /**
   * [Method] 회원가입
   * @param input 사용자 정보
   */
  async signup(input: SignDto): Promise<void> {
    // 사용자 정보 추출
    const { nickname, password } = input;
    // 닉네임 중복 확인을 위한 조회
    const user: User = await this.userService.findOneByNickname(nickname, false);
    // 닉네임이 존재하는 경우
    if (user) throw new BadRequestException('이미 존재하는 닉네임이예요.');

    // Salt 생성
    const salt: string = await genSalt();
    // 비밀번호 암호화
    const encrypted: string = await hash(password, salt);

    // 사용자 생성
    return await this.userService.create(nickname, encrypted);
  }
  /**
   * [Method] 액세스 토큰 갱신
   * @param refreshToken 리프레쉬 토큰
   * @returns 액세스 토큰
   */
  async slient(refreshToken: string): Promise<TokenDto> {
    // Payload 추출
    const payload: any = this.jwtService.decode(refreshToken);
    // 액세스 토큰 생성
    const accessToken: string = this.generateAccessToken(payload.id);
    // 액세스 토큰 반환
    return { accessToken };
  }

  /**
   * [Method] 액세스 토큰 생성
   * @param id 사용자 ID
   * @param expiresIn 만료시간, 초단위 (Default: 900)
   * @returns 액세스 토큰
   */
  private generateAccessToken(id: string, expiresIn: number = 900): string {
    // Payload 생성
    const payload: any = { sub: id };
    // 토큰 옵션
    const options: JwtSignOptions = { expiresIn, secret: this.configService.get<string>('ACCESS_TOKEN_SECRET') };
    // 토큰 생성 및 반환
    return this.jwtService.sign(payload, options);
  }
}
