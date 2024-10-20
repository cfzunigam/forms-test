import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
  ) {}

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const form = this.formsRepository.create(createFormDto);
    return this.formsRepository.save(form);
  }

  findAll(): Promise<Form[]> {
    return this.formsRepository.find();
  }

  findOne(id: string): Promise<Form> {
    return this.formsRepository.findOne({ where: { id } });
  }
}
