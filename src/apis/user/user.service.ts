import { Injectable } from '@nestjs/common';
// Entity
import { Group } from '../group/group.entity';
import { RawUser, User } from './user.entity';
// Exception
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  /**
   * [Method] ID를 이용한 사용자 삭제
   * @param id 사용자 ID
   */
  async deleteUser(id: string): Promise<void> {
    // 사용자 삭제
    const result: any = await RawUser.delete(id);
    // 예외 처리
    if (result.affected === 0) throw new NotFoundException();
  }
  /**
   * [Method] ID를 이용한 사용자 닉네임 조회
   * @param id 사용자 ID
   * @returns 사용자 닉네임
   */
  async findNickname(id: string): Promise<string> {
    // ID를 이용한 사용자 조회
    const user: User = await this.findUser(id);
    // 사용자 닉네임 반환
    return user.nickname;
  }
  /**
   * [Method] ID를 이용한 사용자 조회
   * @param id 사용자 ID
   * @returns 조회 결과
   */
  async findUser(id: string): Promise<User> {
    // 사용자 조회
    const user: RawUser = await RawUser.findOneBy({ id });
    // 예외 처리
    if (!user) throw new NotFoundException();

    // 비밀번호 속성 제거
    delete user.password;
    // 조회 결과 반환
    return user;
  }
  /**
   * [Method] 사용자 목록 조회
   * @returns 조회 결과
   */
  async findUsers(): Promise<User[]> {
    // 목록 조회
    const users: RawUser[] = await RawUser.find();
    // 비밀번호 속성 제거 후, 반환
    return users.map((elem: RawUser): User => {
      // 속성 제거
      delete elem.password;
      // 반환
      return elem;
    });
  }
  /**
   * [Method] 사용자를 그룹에 추가
   * @param userId 사용자 ID
   * @param groupId 그룹 ID
   */
  async joinGroup(userId: string, groupId: string): Promise<void> {
    // 사용자 조회
    const user: User = await this.findUser(userId);
    // 사용자가 없을 경우, 예외 처리
    if (!user) throw new NotFoundException('해당 ID를 가진 사용자는 존재하지 않아요');
    // 기존에 가입된 그룹이 있을 경우, 예외 처리
    if (user.group) throw new BadRequestException('이미 다른 그룹에 가입이 되어 있어요');

    // 그룹 조회
    const group: Group = await Group.findOneBy({ id: groupId });
    // 그룹이 없을 경우, 예외 처리
    if (!group) throw new NotFoundException('해당 ID를 가진 그룹은 존재하지 않아요');

    // 사용자를 그룹에 추가
    await RawUser.update(userId, { group });
  }
}
