import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
  ValidationPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

// @SkipThrottle()  SKIP THROTTLE FOR ENTIRE MODULE
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  private readonly logger = new MyLoggerService(EmployeeController.name);
  @Post()
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  ) {
    this.logger.log(
      `Request for all Employees\t${ip}`,
      EmployeeController.name,
    );
    return this.employeeService.findAll(role);
  }
  @Throttle({ short: { ttl: 1000, limit: 1 } }) // OVERRIDE DEFAULT SETTINGS
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
