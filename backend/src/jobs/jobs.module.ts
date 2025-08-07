import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Job],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Job]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
