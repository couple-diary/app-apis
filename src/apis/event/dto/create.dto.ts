import { IsBoolean, IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
// DTO
import { LocationDto } from './location.dto';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(1)
  title: string;

  @ApiProperty({ nullable: true })
  @IsBoolean()
  allDay: boolean;

  @ApiProperty()
  @IsDateString()
  start: Date;

  @ApiProperty()
  @IsDateString()
  end: Date;

  @ApiProperty()
  location: LocationDto

  @ApiProperty({ nullable: true })
  backgroundColor?: string;

  @ApiProperty({ nullable: true })
  borderColor?: string;

  @ApiProperty({ nullable: true })
  textColor?: string;
}