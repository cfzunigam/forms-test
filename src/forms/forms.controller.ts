import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto): Promise<Form> {
    return this.formsService.create(createFormDto);
  }

  @Get()
  findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Form> {
    return this.formsService.findOne(id);
  }
}
