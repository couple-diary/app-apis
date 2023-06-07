import { UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

/**
 * [Function] 요청 객체로부터 사용자 ID 추출
 * @param req 요청 객체
 * @returns 사용자 ID
 */
export function extractUserId(req: Request): string {
  // 사용자 ID 추출
  const { id } = req?.user as any;
  // 예외 처리
  if (!id) throw new UnauthorizedException();
  // 반환
  return id;
}