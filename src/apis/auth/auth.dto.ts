import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class SignDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nickname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AccessTokenDto {
  @ApiProperty()
  accessToken: string;
}

export class TokenDto extends AccessTokenDto {
  @ApiProperty()
  refreshToken: string;
}