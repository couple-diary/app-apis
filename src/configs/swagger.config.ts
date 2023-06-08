import { INestApplication } from '@nestjs/common';
// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// Swagger (type)
import type { OpenAPIObject } from '@nestjs/swagger';

export class Swagger {
  // 빌더 객체
  private builder = new DocumentBuilder();
  // 스웨거 설정 객체
  private config: any;

  constructor({ title, description, version }: any) {
    this.config = this.builder.setTitle(title).setDescription(description).setVersion(version ? version : '1.0.0').addBearerAuth().build();
  }

  setup(app: INestApplication): void {
    // 웹 문서(Document) 생성
    const document: OpenAPIObject = SwaggerModule.createDocument(app, this.config);
    // 문서에 대한 URL 설정
    SwaggerModule.setup('apis-doc', app, document);
  }
}