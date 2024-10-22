import { Test, TestingModule } from '@nestjs/testing';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './entities/form.entity';

describe('FormsController', () => {
  let formsController: FormsController;
  let formsService: FormsService;

  const mockFormsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormsController],
      providers: [
        {
          provide: FormsService,
          useValue: mockFormsService,
        },
      ],
    }).compile();

    formsController = module.get<FormsController>(FormsController);
    formsService = module.get<FormsService>(FormsService);
  });

  it('should be defined', () => {
    expect(formsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new form', async () => {
      const createFormDto: CreateFormDto = {
        name: 'Test Form',
        description: 'This is a test form',
        fields: [
          {
            name: 'name',
            label: 'label',
            type: 'email',
            required: true,
            values: [],
            defaultValue: '',
          },
        ],
      };

      const result: Form = { id: '1', name: 'Test Form', description: 'This is a test form', fields: [] };

      mockFormsService.create.mockResolvedValue(result);

      expect(await formsController.create(createFormDto)).toBe(result);
      expect(formsService.create).toHaveBeenCalledWith(createFormDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      const result: Form[] = [
        {
          id: '1',
          name: 'Test Form',
          description: 'This is a test form',
          fields: [],
        },
      ];

      mockFormsService.findAll.mockResolvedValue(result);

      expect(await formsController.findAll()).toBe(result);
      expect(formsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a form by id', async () => {
      const result: Form = {
        id: '1',
        name: 'Test Form',
        description: 'This is a test form',
        fields: [],
      };

      mockFormsService.findOne.mockResolvedValue(result);

      expect(await formsController.findOne('1')).toBe(result);
      expect(formsService.findOne).toHaveBeenCalledWith('1');
    });
  });
});
