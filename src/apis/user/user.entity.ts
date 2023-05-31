import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
// Entity
import { Group } from '../group/group.entity';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['nickname'])
export class RawUser extends BaseEntity {
  @ApiProperty({ description: 'ID', type: String })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ description: '사용자 닉네임', type: String })
  @Column()
  nickname: string;

  @ApiProperty({ description: '비밀번호', type: String })
  @Column()
  password: string;

  @ApiProperty({ description: '소속 그룹', type: Group, nullable: true })
  @ManyToOne(type => Group, group => group.users, { eager: true })
  group: Group;
}

export class User {
  @ApiProperty({ description: 'ID', type: String })
  id: string;

  @ApiProperty({ description: '사용자 닉네임', type: String })
  nickname: string;

  @ApiProperty({ description: '소속 그룹', type: Group, nullable: true })
  group: Group;
}