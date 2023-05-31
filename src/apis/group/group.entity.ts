import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
// Entity
import { RawUser } from '../user/user.entity';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Group extends BaseEntity {
  @ApiProperty({ description: 'ID', type: String })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ description: '소속된 사용자', type: [RawUser] })
  @OneToMany(type => RawUser, user => user.group, { eager: false })
  users: RawUser[];
}