import { IsNotEmpty, IsString } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  partner: string;
}