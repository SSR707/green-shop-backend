import { HttpStatus, Injectable, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as path from 'path';
import * as express from 'express';

@Injectable()
export default class Application {
  public static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      }),
    );
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
    app.use(
      '/uploads/users',
      express.static(path.join(process.cwd(), 'uploads', 'users')),
    );
    app.use(
      '/uploads/products',
      express.static(path.join(process.cwd(), 'uploads', 'products')),
    );
    const api = 'api/v1';
    const swaggerApi = 'api/docs';
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    app.setGlobalPrefix(api);
    const config_swagger = new DocumentBuilder()
      .setTitle('Nasiya Savdo')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();

    const documentFactory = () =>
      SwaggerModule.createDocument(app, config_swagger);

    SwaggerModule.setup(swaggerApi, app, documentFactory);
    await app.listen(config.API_PORT, () => {
      console.log(Date.now());
    });
  }
}
