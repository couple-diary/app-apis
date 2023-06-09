import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
// Entity
import { Event } from '../event/event.entity';
import { Group } from '../group/group.entity';
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(type => Group, group => group.users, { eager: true })
  group: Group;

  @ManyToOne(type => Event, event => event.owner)
  events: Event;
}

export class UserInfo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  group: Group;
}