import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;

  // Augmenter la limite pour les images base64 (erreur 413 Payload Too Large)
  const express = require('express');
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  app.setGlobalPrefix('api');


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true, // <- This line here
      },
    }), // Remove all unused properties from request using class transformer
  );

  const config = new DocumentBuilder()
    .setTitle('NySekoliko API')
    .setDescription('API pour la gestion des écoles et étudiants')
    .setVersion('1.0')
    .addBearerAuth() // si JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // /api → URL Swagger

  await app.listen(port, () => {
    console.log(`Server is running on port : http://localhost:${port}`);
  });
}
bootstrap();
