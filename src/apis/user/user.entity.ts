import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['nickname'])
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  createAt: Date;
}

export class UserInfo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  createAt: Date;
}