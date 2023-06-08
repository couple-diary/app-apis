import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Cookie parser
import * as cookieParser from 'cookie-parser';
// Swagger
import { Swagger } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 쿠키 파서 추가
  app.use(cookieParser());

  // 스웨거 문서 생성
  const swagger = new Swagger({ title: 'Couple Diary APIs' });
  // 스웨거 문서 통합
  swagger.setup(app);

  // 애플리케이션 실행
  await app.listen(3000);
}
bootstrap();
