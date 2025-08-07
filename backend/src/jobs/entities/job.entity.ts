import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum JobType {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  FREELANCE = 'freelance',
}

export enum LocationType {
  REMOTE = 'remote',
  HYBRID = 'hybrid',
  ONSITE = 'onsite',
  MUMBAI = 'mumbai',
  DELHI = 'delhi',
  BANGALORE = 'bangalore',
}

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  jobTitle: string;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  minSalary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  maxSalary: number;

  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({
    type: 'enum',
    enum: JobType,
  })
  jobType: JobType;

  @Column({ type: 'date' })
  applicationDeadline: Date;

  @Column({ type: 'text' })
  jobDescription: string;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 