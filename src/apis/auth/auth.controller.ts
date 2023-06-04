import { Body, Controller, HttpCode, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
// DTO
import { SignDto, TokenDto } from './dto/sign.dto';
// Exception
import { UnauthorizedException } from '@nestjs/common';
// Express
import type { Request, Response } from 'express';
// Method
import { Post } from '@nestjs/common';
// Service
import { AuthService } from './auth.service';
// Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private configService: ConfigService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  @HttpCode(200)
  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() input: SignDto, @Res() res: Response): Promise<any> {
    // 로그인
    const result: TokenDto = await this.authService.signin(input);

    // 쿠키 만료시간 설정
    const maxAge: number = (this.configService.get<number>('REFRESH_TOKEN_EXPIRES') | 1296000) * 1000;
    // 쿠키 설정
    res.cookie('refresh', result.refreshToken, { httpOnly: true, maxAge: maxAge })

    return res.json({ accessToken: result.accessToken });
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 200, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '회원가입 실패' })
  @HttpCode(200)
  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() input: SignDto): Promise<void> {
    return this.authService.signup(input);
  }

  @ApiOperation({ summary: '로그인 갱신' })
  @ApiResponse({ status: 200, description: '로그인 갱신 성공' })
  @ApiResponse({ status: 400, description: '로그인 갱신 실패' })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @HttpCode(200)
  @Post('/slient')
  slient(@Req() req: Request): Promise<TokenDto> {
    // 헤더에서 액세스 토큰 추출
    const refreshToken: string | undefined = req.cookies['refresh'];
    // 토큰이 없을 경우
    if (!refreshToken) throw new UnauthorizedException();
    // 액세스 토큰 갱신
    return this.authService.slient(refreshToken);
  }

  /**
   * [Method] 요청 헤더에서 액세스 토큰 추출
   * @param req 요청 객체
   * @returns 액세스 토큰
   */
  private extractTokenFromHeader(req: Request): string | undefined {
    // 토큰 추출
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    // 토큰 반환
    return type === 'Bearer' ? token : undefined;
  }
}
