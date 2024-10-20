import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './entities/response.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { Form } from '../forms/entities/form.entity';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private responsesRepository: Repository<Response>,
    @InjectRepository(Form)
    private formsRepository: Repository<Form>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const form = await this.formsRepository.findOne({ where: { id: createResponseDto.formId } });
    if (!form) {
      throw new Error('Formulario no encontrado');
    }

    const response = this.responsesRepository.create({
      form,
      answers: createResponseDto.answers,
    });

    return this.responsesRepository.save(response);
  }
}
