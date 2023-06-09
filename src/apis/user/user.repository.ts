import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
// Entity
import { Group } from '../group/group.entity';
import { User } from './user.entity';
// UUID
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * [Method] 사용자 생성
   * @param nickname 닉네임
   * @param password 비밀번호
   */
  async createUser(nickname: string, password: string): Promise<void> {
    try {
      // 사용자 객체 생성
      const user: User = this.create({ id: uuid(), nickname, password });
      // 저장
      await this.save(user);
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }
  /**
   * [Method] 사용자 조회
   * @param id 사용자 ID
   * @param isCatchException 예외 처리 여부 (Default: true)
   * @returns 조회 결과
   */
  async findById(id: string, isCatchException: boolean = true): Promise<User> {
    // 데이터 조회
    const user: User = await this.findOneBy({ id });
    // 예외 처리
    if (isCatchException && !user) throw new NotFoundException(`해당 사용자를 찾을 수 없어요. (id: ${id})`);
    // 결과 반환
    return user;
  }
  /**
   * [Method] 사용자 조회
   * @param nickname 사용자 닉네임
   * @param isCatchException 예외 처리 여부 (Default: true)
   * @returns 조회 결과
   */
  async findByNickname(nickname: string, isCatchException: boolean = true): Promise<User> {
    // 데이터 조회
    const user: User = await this.findOneBy({ nickname });
    // 예외 처리
    if (isCatchException && !user) throw new NotFoundException(`해당 사용자를 찾을 수 없어요. (nickname: ${nickname})`);
    // 결과 반환
    return user;
  }
  /**
   * [Method] 그룹 참가
   * @param id 사용자 ID
   * @param group 참가할 그룹
   */
  async joinGroup(id: string, group: Group): Promise<void> {
    try {
      // 사용자 정보 갱신
      const result: any = await this.update(id, { group });
      // 예외 처리
      if (result.affected === 0) throw new NotFoundException(`해당 사용자를 찾을 수 없어요. (id: ${id})`);
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }
  /**
   * [Method] 그룹 탈퇴
   * @param id 사용자 ID
   */
  async withdrawalGroup(id: string): Promise<void> {
    try {
      // 사용자 정보 갱신
      const result: any = await this.update(id, { group: undefined });
      // 예외 처리
      if (result.affected === 0) throw new NotFoundException(`해당 사용자를 찾을 수 없어요. (id: ${id})`)
    } catch (err: unknown) {
      throw new InternalServerErrorException();
    }
  }
}