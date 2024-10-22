import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { Response } from './entities/response.entity';

describe('ResponsesController', () => {
  let responsesController: ResponsesController;
  let responsesService: ResponsesService;

  const mockResponsesService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResponsesController],
      providers: [
        {
          provide: ResponsesService,
          useValue: mockResponsesService,
        },
      ],
    }).compile();

    responsesController = module.get<ResponsesController>(ResponsesController);
    responsesService = module.get<ResponsesService>(ResponsesService);
  });

  it('should be defined', () => {
    expect(responsesController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new response', async () => {
      const createResponseDto: CreateResponseDto = {
        formId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        answers: {
          email: 'test@example.com',
          name: 'form example',
        },
      };

      const response = {
        id: '1',
        formId: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        answers: {
          email: 'test@example.com',
          name: 'form example',
        },
      };

      mockResponsesService.create.mockResolvedValue(response);

      const result = await responsesController.create(createResponseDto);
      expect(result).toEqual(response);
      expect(responsesService.create).toHaveBeenCalledWith(createResponseDto);
    });
  });
});
