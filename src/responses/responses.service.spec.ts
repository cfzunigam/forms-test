import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponsesService } from './responses.service';
import { Response } from './entities/response.entity';
import { Form } from '../forms/entities/form.entity';
import { CreateResponseDto } from './dto/create-response.dto';

describe('ResponsesService', () => {
  let service: ResponsesService;
  let responsesRepository: Repository<Response>;
  let formsRepository: Repository<Form>;

  const mockResponsesRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockFormsRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsesService,
        {
          provide: getRepositoryToken(Response),
          useValue: mockResponsesRepository,
        },
        {
          provide: getRepositoryToken(Form),
          useValue: mockFormsRepository,
        },
      ],
    }).compile();

    service = module.get<ResponsesService>(ResponsesService);
    responsesRepository = module.get<Repository<Response>>(getRepositoryToken(Response));
    formsRepository = module.get<Repository<Form>>(getRepositoryToken(Form));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a response if form is found', async () => {
      const createResponseDto: CreateResponseDto = {
        formId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        answers: {
          email: 'test@example.com',
          name: 'form example',
        },
      };

      const formEntity: Form = {
        id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        name: 'Test Form',
        description: 'form example',
        fields: [],
      };

      const responseEntity: Response = {
        id: '1',
        form: formEntity,
        answers: {
          email: 'test@example.com',
          name: 'form example',
        },
      };

      mockFormsRepository.findOne.mockResolvedValue(formEntity);
      mockResponsesRepository.create.mockReturnValue(responseEntity);
      mockResponsesRepository.save.mockResolvedValue(responseEntity);

      const result = await service.create(createResponseDto);

      expect(result).toEqual(responseEntity);
      expect(formsRepository.findOne).toHaveBeenCalledWith({ where: { id: createResponseDto.formId } });
      expect(responsesRepository.create).toHaveBeenCalledWith({
        form: formEntity,
        answers: createResponseDto.answers,
      });
      expect(responsesRepository.save).toHaveBeenCalledWith(responseEntity);
    });

    it('should throw an error if form is not found', async () => {
      const createResponseDtoError: CreateResponseDto = {
        formId: null,
        answers: {
          email: 'test@example.com',
          name: 'form example',
        },
      };

      mockFormsRepository.findOne.mockRejectedValue(new Error('Formulario no encontrado'));

      await expect(service.create(createResponseDtoError)).rejects.toThrow('Formulario no encontrado');
      expect(formsRepository.findOne).toHaveBeenCalledWith({ where: { id: createResponseDtoError.formId } });
    });
  });
});
