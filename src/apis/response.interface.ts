import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ description: '상태 코드', type: Number })
  statusCode: number;

  @ApiProperty({ description: '스택 메시지', type: String })
  message: string;

  @ApiProperty({ description: '에러 메시지', type: String, nullable: true })
  error?: string;
}