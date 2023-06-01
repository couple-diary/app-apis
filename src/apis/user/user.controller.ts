import { Controller, Request, UseGuards } from '@nestjs/common';
// Entity
import { User } from './user.entity';
// Guard
import { JwtAuthGuard } from '../auth/auth.guard';
// Interface
import { ErrorResponse } from '../response.interface';
// Method
import { Get } from '@nestjs/common';
// Service
import { UserService } from './user.service';
// Swagger
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('사용자')
@ApiResponse({ status: 403, description: '권한 필요', type: ErrorResponse })
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor (private service: UserService) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자 정보 조회' })
  @ApiResponse({ status: 200, description: '조회 완료' })
  findInfo(@Request() req: any): Promise<User> {
    return this.service.findUser(req.user);
  }

  @Get('/nickname')
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자 닉네임 조회' })
  @ApiResponse({ status: 200, description: '조회 완료' })
  @ApiResponse({ status: 404, description: '조회 실패', type: ErrorResponse })
  findNickname(@Request() req: any): Promise<string> {
    return this.service.findNickname(req.user);
  }

  // @Get('all')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '사용자 목록 조회 [관리자용]' })
  // @ApiResponse({ status: 200, description: '조회 완료' })
  // findUsers(): Promise<User[]> {
  //   return this.service.findUsers();
  // }

  // @Get(':id')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '사용자 정보 조회 [관리자용]' })
  // @ApiResponse({ status: 200, description: '조회 완료' })
  // @ApiResponse({ status: 404, description: '조회 실패', type: ErrorResponse })
  // findUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
  //   return this.service.findUser(id);
  // }
}
