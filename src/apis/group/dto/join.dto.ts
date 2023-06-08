import { IsNotEmpty, IsString } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class JoinGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  groupId: string;
}