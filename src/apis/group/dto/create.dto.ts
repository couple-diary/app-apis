import { IsNotEmpty } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsNotEmpty()
  userId: string;
}