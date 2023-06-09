import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
// Entity
import { Group } from './group.entity';
import { User } from '../user/user.entity';
// Exception
import { NotFoundException } from '@nestjs/common';
// UUID
import { v4 as uuid } from 'uuid';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(private dataSource: DataSource) {
    super(Group, dataSource.createEntityManager());
  }

  /**
   * [Method] 그룹 생성
   * @param users 그룹에 소속된 사용자들 (2명)
   * @returns 처리 결과
   */
  async createGroup(users: User[]): Promise<Group> {
    try {
      // 그룹 객체 생성
      const group: Group = this.create({ id: uuid(), users });
      // 저장
      await this.save(group);
      // 결과 반환
      return group;
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }
  /**
   * [Method] 그룹 조회
   * @param id 그룹 ID
   * @returns 조회 결과
   */
  async findById(id: string): Promise<Group> {
    // 데이터 조회
    const group: Group = await this.findOneBy({ id });
    // 예외 처리
    if (!group) throw new NotFoundException();
    // 결과 반환
    return group;
  }
}