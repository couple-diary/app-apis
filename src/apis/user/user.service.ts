import { Injectable } from '@nestjs/common';
// Entity
import { User, UserInfo } from './user.entity';
// Exception
import { NotFoundException } from '@nestjs/common';
// UUID
import { v4 as uuid } from 'uuid'; 

@Injectable()
export class UserService {
  /**
   * [Method] 사용자 생성
   * @param nickname 사용자 닉네임
   * @param password 비밀번호
   */
  async create(nickname: string, password: string): Promise<void> {
    // 사용자 생성
    const newUser: User = User.create({
      id: uuid(),
      nickname,
      password,
      createAt: new Date()
    });
    // 저장
    await User.save(newUser);
  }
  /**
   * [Method] 사용자 조회
   * @param id 사용자 ID
   * @param isCatchException 예외 처리 여부 (Default: true)
   * @returns 조회 결과 반환
   */
  async findOneById(id: string, isCatchException: boolean = true): Promise<User> {
    // 조회
    const user: User = await User.findOneBy({ id });
    // 예외 처리
    if (isCatchException && !user) throw new NotFoundException();
    // 조회 결과 반환
    return user;
  }
  /**
   * [Method] 사용자 조회
   * @param nickname 사용자 닉네임
   * @param isCatchException 예외 처리 여부 (Default: true)
   * @returns 조회 결과 반환
   */
  async findOneByNickname(nickname: string, isCatchException: boolean = true): Promise<User> {
    // 조회
    const user: User = await User.findOneBy({ nickname });
    // 예외 처리
    if (isCatchException && !user) throw new NotFoundException();
    // 조회 결과 반환
    return user;
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
}
