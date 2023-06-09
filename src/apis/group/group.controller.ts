import { Body, Controller, Param, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
// DTO
import { CreateGroupDto } from './dto/create.dto';
// Entity
import { Group } from './group.entity';
// Guard
import { JwtAuthGuard } from '../auth/auth.guard';
// Method
import { Get, Post } from '@nestjs/common';
// Service
import { GroupService } from './group.service';
// Swagger
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// Utilities
import { extractUserId } from 'src/utilities/extractor';

@ApiTags('그룹')
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: '그룹 생성' })
  @ApiResponse({ status: 201, description: '그룹 생성 성공' })
  @ApiResponse({ status: 400, description: '그룹 생성 실패' })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Req() req: Request, @Body() input: CreateGroupDto): Promise<void> {
    // 정보 추출
    const { partner } = input;
    // 사용자 ID 추출
    const userId: string = extractUserId(req);
    // 그룹 생성
    return this.groupService.create(userId, partner);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '그룹 조회 [개발용]' })
  @ApiResponse({ status: 200, description: '조회 성공', type: Group })
  @ApiResponse({ status: 401, description: '권한 없음' })
  @ApiResponse({ status: 404, description: '대상 없음' })
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  find(@Param('id') id: string): Promise<Group> {
    // 그룹 생성
    return this.groupService.find(id);
  }
}
