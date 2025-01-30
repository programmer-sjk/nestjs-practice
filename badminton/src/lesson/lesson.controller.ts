import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from './../common/response-entity';
import { LessonScheduleRequest } from './dto/lesson-schedule.request';
import { RegisterRequest } from './dto/register.request';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async findLessonSchedules(@Query() request: LessonScheduleRequest) {
    try {
      await this.lessonService.findLessonSchedules(request);
      return ResponseEntity.OK();
    } catch (e) {
      return ResponseEntity.ERROR(e.message);
    }
  }

  @Roles(Role.USER)
  @Post()
  async register(@Body() request: RegisterRequest) {
    try {
      await this.lessonService.addLesson(request);
      return ResponseEntity.OK();
    } catch (e) {
      return ResponseEntity.ERROR(e.message);
    }
  }

  @Roles(Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.lessonService.removeLesson(id);
      return ResponseEntity.OK();
    } catch (e) {
      return ResponseEntity.ERROR(e.message);
    }
  }
}
