import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: 'ID', type: Number })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '사용자 닉네임', type: String })
  @Column()
  nickname: string;

  @ApiProperty({ description: '비밀번호', type: String })
  @Column()
  password: string;

  @ApiProperty({ description: '코드', type: String })
  @Column()
  code: string;

  @ApiProperty({ description: '그룹 ID', type: String })
  @Column()
  groupId: string;
}