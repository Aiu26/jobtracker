import { IsString, IsNumber, IsEnum, IsDateString, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { JobType } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty({ message: 'Job title is required' })
  jobTitle: string;

  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  location: string;

  @IsNumber()
  @Min(0, { message: 'Minimum salary must be at least 0' })
  @Max(10000000, { message: 'Minimum salary cannot exceed 10,000,000' })
  minSalary: number;

  @IsNumber()
  @Min(0, { message: 'Maximum salary must be at least 0' })
  @Max(10000000, { message: 'Maximum salary cannot exceed 10,000,000' })
  maxSalary: number;

  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  companyName: string;

  @IsEnum(JobType, { message: 'Invalid job type' })
  jobType: JobType;

  @IsDateString({}, { message: 'Invalid application deadline format' })
  applicationDeadline: string;

  @IsString()
  @IsNotEmpty({ message: 'Job description is required' })
  jobDescription: string;

  @IsOptional()
  @IsNotEmpty({ message: 'isPublished must be a boolean' })
  isPublished?: boolean;
} 