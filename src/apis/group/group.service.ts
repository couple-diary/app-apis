import { Injectable } from '@nestjs/common';
// Entity
import { Group } from './group.entity';
import { User } from '../user/user.entity';
// Exception
import { BadRequestException } from '@nestjs/common';
// Repository
import { UserRepository } from '../user/user.repository';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository, private userRepository: UserRepository) {}

  /**
   * [Method] 그룹 생성
   * @param userId 사용자 ID
   * @param pNickname 상대방 닉네임
   */
  async create(userId: string, pNickname: string): Promise<void> {
    // 사용자 조회
    const user: User = await this.userRepository.findById(userId);
    // 소속 여부 확인
    if (user.group) throw new BadRequestException('본인은 이미 그룹이 존재해요.');
    // 본인 여부 확인
    else if (user.nickname === pNickname) throw new BadRequestException('동일인끼리 그룹을 만들 수 없어요.');

    // 파트너 조회
    const partner: User = await this.userRepository.findByNickname(pNickname);
    // 소속 여부 확인
    if (partner.group) throw new BadRequestException('해당 사용자는 이미 그룹이 존재해요.');

    // 그룹 생성
    const group: Group = await this.groupRepository.createGroup([user, partner]);

    // 소속 설정
    await this.userRepository.joinGroup(user.id, group);
    await this.userRepository.joinGroup(partner.id, group);
  }
  /**
   * [Method] 그룹 조회
   * @param id 그룹 ID
   * @returns 조회 결과
   */
  find(id: string): Promise<Group> {
    return this.groupRepository.findById(id);
  }
}
