import { Injectable } from '@nestjs/common';
// Entity
import { User, UserInfo } from './user.entity';
// Repository
import { GroupRepository } from '../group/group.repository';
import { UserRepository } from './user.repository';
import { Group } from '../group/group.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private groupRepository: GroupRepository) {}

  /**
   * [Method] 사용자 조회
   * @param id 사용자 ID
   * @returns 조회 결과 반환
   */
  async findOneById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
  /**
   * [Method] 사용자 조회
   * @param nickname 사용자 닉네임
   * @returns 조회 결과 반환
   */
  async findOneByNickname(nickname: string): Promise<User> {
    return this.userRepository.findByNickname(nickname);
  }
  /**
   * [Method] 그룹 참가
   * @param id 사용자 ID
   * @param groupId 그룹 ID
   */
  async joinGroup(id: string, groupId: string): Promise<void> {
    // 그룹 조회
    const group: Group = await this.groupRepository.findById(groupId);
    // 소속 설정
    await this.userRepository.joinGroup(id, group);
  }
  /**
   * [Method] 민감 정보 제거 (비밀번호 제거)
   * @param user 사용자 정보
   * @returns 가공된 사용자 정보
   */
  removeSensitiveInfo(user: User): UserInfo {
    // 비밀번호 속성 제거
    delete user.password;
    // 반환
    return user;
  }
  /**
   * [Method] 그룹 탈퇴
   * @param id 사용자 ID
   */
  async withdrawalGroup(id: string): Promise<void> {
    await this.userRepository.withdrawalGroup(id);
  }
}
