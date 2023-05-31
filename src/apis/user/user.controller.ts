import { Controller, Param, ParseUUIDPipe } from '@nestjs/common';
// Entity
import { User } from './user.entity';
// Interface
import { ErrorResponse } from '../response.interface';
// Method
import { Get } from '@nestjs/common';
// Service
import { UserService } from './user.service';
// Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('사용자')
@Controller('user')
export class UserController {
  constructor (private service: UserService) {}

  @Get('all')
  @ApiOperation({ summary: '사용자 목록 조회' })
  @ApiResponse({ status: 200, description: '조회 완료' })
  findUsers(): Promise<User[]> {
    return this.service.findUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: '사용자 정보 조회' })
  @ApiResponse({ status: 200, description: '조회 완료' })
  @ApiResponse({ status: 404, description: '조회 실패', type: ErrorResponse })
  findUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.service.findUser(id);
  }

  @Get(':id/nickname')
  @ApiOperation({ summary: '사용자 닉네임 조회' })
  @ApiResponse({ status: 200, description: '조회 완료' })
  @ApiResponse({ status: 404, description: '조회 실패', type: ErrorResponse })
  findNickname(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.service.findNickname(id);
  }
}
