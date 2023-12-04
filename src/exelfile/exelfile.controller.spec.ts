import { Test, TestingModule } from '@nestjs/testing';
import { ExelfileController } from './exelfile.controller';

describe('ExelfileController', () => {
  let controller: ExelfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExelfileController],
    }).compile();

    controller = module.get<ExelfileController>(ExelfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
