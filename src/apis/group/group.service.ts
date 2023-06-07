import { Injectable } from '@nestjs/common';
// Entity
import { Group } from './group.entity';
import { User } from '../user/user.entity';
// Exception
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// Service
import { UserService } from '../user/user.service';
// UUID
import { v4 as uuid } from 'uuid';

@Injectable()
export class GroupService {
  constructor(private userService: UserService) {}

  /**
   * [Method] 그룹 생성
   * @param userId 사용자 ID
   * @param pNickname 상대방 닉네임
   */
  async create(userId: string, pNickname: string): Promise<void> {
    // 사용자 조회
    const user: User = await this.userService.findOneById(userId);
    // 소속 여부 확인
    if (user.group) throw new BadRequestException('본인은 이미 그룹이 존재해요.');
    // 본인 여부 확인
    else if (user.nickname === pNickname) throw new BadRequestException('동일인끼리 그룹을 만들 수 없어요.');

    // 파트너 조회
    const partner: User = await this.userService.findOneByNickname(pNickname);
    // 소속 여부 확인
    if (partner.group) throw new BadRequestException('해당 사용자는 이미 그룹이 존재해요.');

    // 그룹 생성
    const group: Group = Group.create({
      id: uuid(),
      createAt: new Date(),
      users: [user, partner]
    });

    // 소속 설정
    await this.userService.join(user.id, group);
    await this.userService.join(partner.id, group);

    // 그룹 저장
    await Group.save(group);
  }
  /**
   * [Method] 그룹 조회
   * @param id 그룹 ID
   * @returns 조회 결과
   */
  async find(id: string): Promise<Group> {
    // 그룹 조회
    const group: Group = await Group.findOneBy({ id });
    // 예외 처리
    if (!group) throw new NotFoundException();
    // 반환
    return group;
  }
  /**
   * [Method] 그룹 참가
   * @param id 그룹 ID
   * @param userId 사용자 ID
   */
  async join(id: string, userId: string): Promise<void> {
    // 그룹 조회
    const group: Group = await Group.findOneBy({ id });
    // 예외 처리
    if (!group) throw new BadRequestException();

    // 소속 설정
    await this.userService.join(userId, group);
  }
  /**
   * [Method] 그룹 탈퇴
   * @param userId 사용자 ID
   */
  async withdrawal(userId: string): Promise<void> {
    // 사용자 소속 삭제
    const result = await User.update(userId, { group: undefined });
    // 예외 처리
    if (result.affected === 0) throw new InternalServerErrorException();
  }
}
