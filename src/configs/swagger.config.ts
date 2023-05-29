import { INestApplication } from '@nestjs/common';
// Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// Swagger (type)
import type { OpenAPIObject } from '@nestjs/swagger';

export function setSwagger(app: INestApplication): void {
  // 스웨거(Swagger) 기본 설정
  const config = new DocumentBuilder().setTitle('Couple Diary API Docs').setVersion('1.0.0').build();
  // Document 생성
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  // 생성한 Document를 보여주기 위한 URL 설정
  SwaggerModule.setup('apis-doc', app, document);
}