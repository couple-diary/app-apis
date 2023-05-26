import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Config
import { setSwagger } from './configs/swagger.config';
// Module
import { AppModule } from './app.module';

async function bootstrap() {
  // 애플리케이션 생성
  const app = await NestFactory.create(AppModule);
  // 스웨거(Swagger) 설정
  setSwagger(app);

  // 에러 응답 처리
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    stopAtFirstError: true
  }));

  await app.listen(3000);
}
bootstrap();
