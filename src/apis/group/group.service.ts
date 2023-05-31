import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
// Entity
import { Group } from './group.entity';
import { RawUser } from '../user/user.entity';
// Exception
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class GroupService {
  /**
   * [Method] 그룹 생성
   * @param userId 사용자 ID
   */
  async createGroup(userId: string): Promise<void> {
    // 사용자 조회
    const user: RawUser = await RawUser.findOneBy({ id: userId });
    // 사용자가 없을 경우, 예외 처리
    if (!user) throw new NotFoundException('해당 ID를 가진 사용자는 존재하지 않아요')

    try {
      // 그룹 ID 생성
      const id: string = uuid();
      // 그룹 객체 생성
      const group: Group = Group.create({ id, users: [user] });
      // 그룹 객체 저장
      await Group.save(group);
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }
  /**
   * [Method] 그룹 목록 조회
   * @returns 조회 결과
   */
  async findGroups(): Promise<Group[]> {
    return await Group.find();
  }
}
