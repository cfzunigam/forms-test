import { Controller, Post, Body } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './entities/response.entity';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  create(@Body() createResponseDto: CreateResponseDto): Promise<Response> {
    return this.responsesService.create(createResponseDto);
  }
}
