import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
// Entity
import { Event } from '../event/event.entity';
import { User } from '../user/user.entity';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Group extends BaseEntity {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @OneToMany(type => User, user => user.group)
  users: User[];

  @ApiProperty()
  @OneToMany(type => Event, event => event.group)
  events: Event[];
}