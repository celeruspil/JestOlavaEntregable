import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockNoteRepository } from './mock/mock';
import { Notebook } from './entities/notebook.entity';
import { title } from 'process';

describe('NotebooksService', () => {
  let service: NotebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotebooksService,
        {
          provide: getRepositoryToken(Notebook),
          useValue: mockNoteRepository
        }
      ],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deberia crear una notebook', async () => {
      const dto = { title: 'Nueva Notebook', content: 'Contenido de la nueva notebook' };
      const res = { id: 1, ...dto };
      mockNoteRepository.create.mockReturnValue(res);
      mockNoteRepository.save.mockResolvedValue(res);

      const result = await service.create(dto);
      expect(mockNoteRepository.create).toHaveBeenCalledWith(dto);
      expect(mockNoteRepository.save).toHaveBeenCalledWith(res);
      expect(result).toEqual(res);
    });
  }),

  describe('findAll', () => {
    it('deberia retornar un array de notebooks', async () => {
      const res = [
        { id: 1, title: 'Notebook 1', content: 'Contenido de la notebook 1' },
        { id: 2, title: 'Notebook 2', content: 'Contenido de la notebook 2' },
      ];
      mockNoteRepository.find.mockResolvedValue(res);  
      const result = await service.findAll();
      expect(mockNoteRepository.find).toHaveBeenCalled();
      expect(result).toEqual(res);
    });
  }),


    it('should be defined', () => {
      expect(service).toBeDefined();
    });
});
