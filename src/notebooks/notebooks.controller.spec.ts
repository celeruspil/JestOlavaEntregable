import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { mockNoteService } from './mock/mock-service';

describe('NotebooksController', () => {
  let controller: NotebooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [NotebooksService,
        { provide: NotebooksService, useValue: mockNoteService }],

    }).compile();
    controller = module.get<NotebooksController>(NotebooksController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe ('create', () => {
    it('deberia crear una notebook', async () => {
      const dto = { title: 'Nueva Notebook', content: 'Contenido de la nueva notebook' };
      const res = { id: 1, ...dto };
      mockNoteService.create.mockResolvedValue(res);
      const result = await controller.create(dto);
      expect(mockNoteService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(res);
    });
    it('deberia lanzar una excepcion al no poder crear una notebook', async () => {
      const dto = { title: 'Nueva Notebook', content: 'Contenido de la nueva notebook' };
      mockNoteService.create.mockRejectedValue(new Error('Error'));
      await expect(controller.create(dto)).rejects.toThrow('Error creating notebook');
      expect(mockNoteService.create).toHaveBeenCalledWith(dto)});
    
    }),

    describe('findAll', () => {
      it('deberia retornar un arreglo de Notebooks', async () => {
        const resp = [  { id: 1, title: 'Notebook 1', content: 'Contenido de la notebook 1' },
        { id: 2, title: 'Notebook 2', content: 'Contenido de la notebook 2' },]
        mockNoteService.findAll.mockResolvedValue(resp);
        const result = await controller.findAll();
        expect(result).toEqual(resp);
        expect(mockNoteService.findAll).toHaveBeenCalled();
      });
      it('deberia lanzar una excepcion al no poder traer las notebooks', async () => {
        mockNoteService.findAll.mockRejectedValue(new Error('Error'));
        await expect(controller.findAll()).rejects.toThrow('Error retrieving notebooks');
        expect(mockNoteService.findAll).toHaveBeenCalled();
      });
      

    })  

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
