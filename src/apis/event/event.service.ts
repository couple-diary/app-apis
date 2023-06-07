import { Injectable } from '@nestjs/common';
// Entity
import { Event } from './event.entity';
import { User } from '../user/user.entity';
// Exception
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
// Service
import { GroupService } from '../group/group.service';
import { UserService } from '../user/user.service';
// UUID
import { v4 as uuid } from 'uuid'; 
import { Group } from '../group/group.entity';

@Injectable()
export class EventService {
  constructor(private userService: UserService, private groupService: GroupService) {}

  /**
   * [Method] 이벤트 생성
   * @param userId 사용자 ID
   * @param input 이벤트 정보
   */
  async create(userId: string, input: any): Promise<Event> {
    // 사용자 조회
    const user: User = await this.userService.findOneById(userId);
    
    // 이벤트 객체 생성
    const event: Event = Event.create({
      ...input,
      id: uuid(),
      group: user.group,
      owner: user
    });

    // 이벤트 저장 및 반환
    return await Event.save(event);
  }
  /**
   * [Method] 그룹에 대한 이벤트 조회
   * @param groupId 그룹 ID
   * @returns 조회 결과
   */
  async findByGroup(groupId: string): Promise<Event[]> {
    // 그룹 조회
    const group: Group = await this.groupService.find(groupId);
    // 조회
    return await Event.createQueryBuilder('event').relation(Group, 'group').of(group).loadMany();
  }
  /**
   * [Method] 이벤트 조회 
   * @param id 이벤트 ID
   * @returns 조회 결과
   */
  async findById(id: string): Promise<Event> {
    // 조회
    const event: Event = await Event.findOneBy({ id });
    // 예외 처리
    if (!event) throw new NotFoundException();
    // 결과 반환
    return event;
  }
  /**
   * [Method] 이벤트 갱신
   * @param id 이벤트 ID
   * @param input 갱신할 정보
   * @returns 갱신 결과
   */
  async update(id: string, input: any): Promise<Event> {
    // 업데이트
    const result = await Event.update(id, { ...input });
    // 예외 처리
    if (result.affected === 0) throw new InternalServerErrorException();
    // 결과 반환
    return result.raw;
  }
}
