import { Body, Controller, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
// DTO
import { JoinGroupDto } from '../group/dto/join.dto';
// Entity
import { User, UserInfo } from './user.entity';
// Guard
import { JwtAuthGuard } from '../auth/auth.guard';
// Method
import { Get, Patch } from '@nestjs/common';
// Service
import { UserService } from './user.service';
// Swagger
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// Utilities
import { extractUserId } from 'src/utilities/extractor';

@ApiTags('사용자')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자 정보 조회' })
  @ApiResponse({ status: 200, description: '조회 성공', type: UserInfo })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '대상 없음' })
  @Get('/')
  @UseGuards(JwtAuthGuard)
  async find(@Req() req: Request): Promise<UserInfo> {
    // 사용자 ID 추출
    const userId: string = extractUserId(req);
    // 사용자 조회
    const user: User = await this.userService.findOneById(userId);
    // 민감정보 삭제 후 반환
    return this.userService.removeSensitiveInfo(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '그룹 참가 [개발용]' })
  @ApiResponse({ status: 200, description: '탈퇴 성공' })
  @ApiResponse({ status: 400, description: '참가 실패' })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Patch('/group/join')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async join(@Req() req: Request, @Body() input: JoinGroupDto): Promise<void> {
    // 사용자 ID 추출
    const userId: string = extractUserId(req);
    // 그룹 ID 추출
    const { groupId } = input;
    // 민감정보 삭제 후 반환
    return this.userService.joinGroup(userId, groupId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '그룹 탈퇴' })
  @ApiResponse({ status: 200, description: '탈퇴 성공' })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @Patch('/group/withdrawal')
  @UseGuards(JwtAuthGuard)
  async withdrawal(@Req() req: Request): Promise<void> {
    // 사용자 ID 추출
    const userId: string = extractUserId(req);
    // 민감정보 삭제 후 반환
    return this.userService.withdrawalGroup(userId);
  }
}
