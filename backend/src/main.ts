import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';

async function bootstrap() {
  const app = await NestFactory.create(JobsModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  await app.listen(process.env.PORT ?? 3001);
  console.log('Job Tracker API is running on port 3001');
}
bootstrap(); 