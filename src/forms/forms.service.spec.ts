import { Test, TestingModule } from '@nestjs/testing';
import { FormsService } from './forms.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './entities/form.entity';
import { CreateFormDto } from './dto/create-form.dto';

describe('FormsService', () => {
  let service: FormsService;
  let repository: Repository<Form>;

  const mockFormRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormsService,
        {
          provide: getRepositoryToken(Form),
          useValue: mockFormRepository,
        },
      ],
    }).compile();

    service = module.get<FormsService>(FormsService);
    repository = module.get<Repository<Form>>(getRepositoryToken(Form));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new form', async () => {
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

      const form = { id: '1', ...createFormDto };

      mockFormRepository.create.mockReturnValue(form);
      mockFormRepository.save.mockResolvedValue(form);

      const result = await service.create(createFormDto);

      expect(result).toEqual(form);
      expect(mockFormRepository.create).toHaveBeenCalledWith(createFormDto);
      expect(mockFormRepository.save).toHaveBeenCalledWith(form);
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      const forms: Form[] = [
        {
          id: '1',
          name: 'Test Form',
          description: 'This is a test form',
          fields: [],
        },
      ];

      mockFormRepository.find.mockResolvedValue(forms);

      const result = await service.findAll();
      expect(result).toEqual(forms);
      expect(mockFormRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a form by id', async () => {
      const form: Form = {
        id: '1',
        name: 'Test Form',
        description: 'This is a test form',
        fields: [],
      };

      mockFormRepository.findOne.mockResolvedValue(form);

      const result = await service.findOne('1');
      expect(result).toEqual(form);
      expect(mockFormRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return null if form is not found', async () => {
      mockFormRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('1');
      expect(result).toBeNull();
      expect(mockFormRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});
