import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(JobsModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
  console.log('Job Tracker API is running on port 3001');
}
bootstrap();
