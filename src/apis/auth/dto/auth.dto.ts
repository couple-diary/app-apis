import { IsNotEmpty, MaxLength } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class SignDto {
  @ApiProperty({ description: '사용자 닉네임' })
  @IsNotEmpty()
  @MaxLength(30)
  nickname: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  password: string;
}