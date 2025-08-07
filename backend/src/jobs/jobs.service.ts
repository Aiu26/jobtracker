import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobsRepository.create({
      ...createJobDto,
      applicationDeadline: new Date(createJobDto.applicationDeadline),
      isPublished: createJobDto.isPublished ?? false,
    });
    
    return await this.jobsRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return await this.jobsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    
    const updateData: any = { ...updateJobDto };
    if (updateData.applicationDeadline) {
      updateData.applicationDeadline = new Date(updateData.applicationDeadline);
    }
    
    Object.assign(job, updateData);
    return await this.jobsRepository.save(job);
  }

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobsRepository.remove(job);
  }

  async publishJob(id: string): Promise<Job> {
    const job = await this.findOne(id);
    job.isPublished = true;
    return await this.jobsRepository.save(job);
  }


} 