import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  HttpCode, 
  HttpStatus,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createJobDto: CreateJobDto) {
    return await this.jobsService.create(createJobDto);
  }



  @Get()
  async findAll() {
    return await this.jobsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.jobsService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return await this.jobsService.update(id, updateJobDto);
  }

  @Patch(':id/publish')
  @HttpCode(HttpStatus.OK)
  async publishJob(@Param('id') id: string) {
    return await this.jobsService.publishJob(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.jobsService.remove(id);
  }
} 