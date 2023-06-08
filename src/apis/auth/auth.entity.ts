import { BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userId'])
export class Auth extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Column()
  token: string;

  @Column()
  createAt: Date;

  @Column()
  expires: Date;
}