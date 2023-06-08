import { IsNumber, IsString } from 'class-validator';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty()
  @IsString()
  placeName: string;

  @ApiProperty()
  @IsNumber()
  x: number;

  @ApiProperty()
  @IsNumber()
  y: number;
}