import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
// Entity
import { Group } from '../group/group.entity';
import { User } from '../user/user.entity';
// Swagger
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Event extends BaseEntity {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  title: string;
  
  @ApiProperty()
  @Column()
  start: Date;

  @ApiProperty()
  @Column()
  end: Date;

  @ApiProperty()
  @Column()
  allDay: boolean;

  @ApiProperty()
  @ManyToOne(type => Group, group => group.events, { eager: true })
  group: Group;

  @ApiProperty()
  @ManyToOne(type => User, user => user.events, { eager: true })
  owner: User;

  @ApiProperty()
  @Column({ nullable: true })
  backgroundColor: string;

  @ApiProperty()
  @Column({ nullable: true })
  borderColor: string;

  @ApiProperty()
  @Column({ nullable: true })
  textColor: string;
}