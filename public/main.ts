import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS améliorée pour accepter l'éditeur de texte
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:3000',
      'https://nysekolokofront-gestion-ecole.onrender.com',
      'https://nysekolokoback-gestion-ecole.onrender.com',
      // Ajouter d'autres origines si nécessaire
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
      'Pragma',
      'Expires',
      'X-Frame-Options',
      'Content-Disposition',
      'Content-Length',
      'X-Content-Type-Options',
      'X-XSS-Protection',
      'Referrer-Policy'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  });
  
  const port = process.env.PORT || 3000;

  // Augmenter la limite pour les images base64 et fichiers (erreur 413 Payload Too Large)
  const express = require('express');
  app.use(express.json({ limit: '500mb' }));
  app.use(express.urlencoded({ extended: true, limit: '500mb' }));

  // Headers supplémentaires pour l'éditeur de texte et les uploads
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Expires, X-Frame-Options, Content-Disposition, Content-Length, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Disposition');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'unsafe-none');
    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    
    // Gérer les requêtes preflight OPTIONS
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

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

  // await app.listen(port, () => {
  //   console.log(`Server is running on port : http://localhost:${port}`);
  // });

  await app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on: http://0.0.0.0:${port}`);
  });
}
bootstrap();
