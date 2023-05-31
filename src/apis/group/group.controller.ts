import { Body, Controller, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
// DTO
import { CreateGroupDto } from './dto/create.dto';
// Entity
import { Group } from './group.entity';
// Interface
import { ErrorResponse } from '../response.interface';
// Method
import { Get, Post } from '@nestjs/common';
// Service
import { GroupService } from './group.service';
// Swagger
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('그룹')
@Controller('group')
export class GroupController {
  constructor(private service: GroupService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @ApiOperation({ summary: '그룹 생성' })
  @ApiResponse({ status: 200, description: '그룹 생성 완료' })
  @ApiResponse({ status: 404, description: '존재하지 않는 사용자 ID로 인한 그룹 생성 실패', type: ErrorResponse })
  @ApiResponse({ status: 500, description: '서버 로직 에러로 인한 그룹 생성 실패', type: ErrorResponse })
  createGroup(@Body() input: CreateGroupDto): Promise<void> {
    return this.service.createGroup(input.userId);
  }

  @Get('all')
  @ApiOperation({ summary: '그룹 목록 조회' })
  @ApiResponse({ status: 200, description: '조회 완료' })
  findGroups(): Promise<Group[]> {
    return this.service.findGroups();
  }
}
